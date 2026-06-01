import { diagnosticData, type ModelKey } from "./diagnostic-data";

export interface UserResponse {
  questionId: number;
  optionId: string;
}

const MODEL_HIERARCHY: Record<ModelKey, number> = {
  outsourced: 0,
  fractional: 1,
  fulltime: 2,
};

function generateAssessmentId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `CFO-${crypto.randomUUID()}`;
  }
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Array.from({ length: 3 }, () =>
    Math.random().toString(36).substring(2, 7)
  )
    .join("")
    .substring(0, 12)
    .toUpperCase();
  return `CFO-${timestamp}-${random}`;
}

function getFormattedDate(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function getPillarRiskLevel(dominantModel: string, spread: number): string {
  if (dominantModel === "fulltime" && spread >= 4) return "CRITICAL";
  if (dominantModel === "fulltime") return "HIGH";
  if (dominantModel === "fractional" && spread >= 4) return "HIGH";
  if (dominantModel === "fractional") return "MODERATE";
  return "BASELINE";
}

function getRiskLevelColor(riskLevel: string): string {
  const map: Record<string, string> = {
    CRITICAL: "#C0392B",
    HIGH: "#E67E22",
    MODERATE: "#F1C40F",
    BASELINE: "#27AE60",
  };
  return map[riskLevel] || "#95A5A6";
}

function findDominantModel(scores: Record<ModelKey, number>): ModelKey {
  return (Object.entries(scores) as [ModelKey, number][]).reduce(
    (best, current) => {
      if (current[1] > best[1]) return current;
      if (
        current[1] === best[1] &&
        MODEL_HIERARCHY[current[0]] > MODEL_HIERARCHY[best[0]]
      )
        return current;
      return best;
    }
  )[0];
}

function distributePercentages(
  scores: Record<ModelKey, number>
): Record<ModelKey, number> {
  const models: ModelKey[] = ["outsourced", "fractional", "fulltime"];

  const safeScores = models.map((m) => Math.max(scores[m] ?? 0, 0));
  const total = safeScores.reduce((s, v) => s + v, 0);

  if (total <= 0) return { outsourced: 0, fractional: 0, fulltime: 0 };

  const exact = safeScores.map((v) => (v / total) * 100);
  const floored = exact.map((v) => Math.floor(v));
  const remainders = exact.map((v, i) => ({
    index: i,
    remainder: v - floored[i],
  }));

  const leftover = 100 - floored.reduce((s, v) => s + v, 0);
  remainders.sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; i < leftover; i++) {
    floored[remainders[i].index]++;
  }

  return {
    outsourced: floored[models.indexOf("outsourced")],
    fractional: floored[models.indexOf("fractional")],
    fulltime: floored[models.indexOf("fulltime")],
  };
}

export interface TriggeredRedFlag {
  questionId: number;
  questionText: string;
  selectedLabel: string;
  message: string | undefined;
  severity: string;
  forceMinimum: ModelKey | undefined;
}

export interface AppliedMultiplier {
  id: string;
  label: string;
  description: string;
  multiplier: number;
  appliedTo: ModelKey;
  scoreBefore: number;
  scoreAfter: number;
}

export interface PillarRiskRating {
  pillarKey: string;
  shortLabel: string;
  icon: string;
  description: string;
  dominantModel: string;
  dominantModelLabel: string;
  riskLevel: string;
  riskColor: string;
  spread: number;
  scores: Record<ModelKey, number>;
  pillarPercentages: Record<ModelKey, number>;
}

export interface RadarDataset {
  modelKey: ModelKey;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointBackgroundColor: string;
}

export interface RadarChartData {
  labels: string[];
  datasets: RadarDataset[];
}

export interface AssessmentMetadata {
  version: string;
  assessmentId: string;
  assessmentDate: string;
  totalQuestionsAnswered: number;
  totalPillarsEvaluated: number;
  redFlagCount: number;
  multiplierCount: number;
  complexityProfile: string;
  unansweredPillars: string[];
  confidenceNote: string;
}

export interface DiagnosticResult {
  recommendedModel: ModelKey;
  recommendedModelLabel: string;
  matchConfidence: number;
  signalStrength: string;
  consistencyScore: number;
  percentages: Record<ModelKey, number>;
  rawScores: Record<ModelKey, number>;
  pillarScores: Record<string, Record<ModelKey, number>>;
  pillarRiskRatings: Record<string, PillarRiskRating>;
  radarChartData: RadarChartData;
  redFlagsTriggered: TriggeredRedFlag[];
  redFlagOverrideApplied: boolean;
  complexityMultipliersApplied: AppliedMultiplier[];
  forceMinimumApplied: ModelKey | null;
  assessmentMetadata: AssessmentMetadata;
}

export function processResponses(
  userResponses: UserResponse[],
  data = diagnosticData
): DiagnosticResult {
  const dedupedMap = new Map<number, UserResponse>();
  for (const response of userResponses) {
    dedupedMap.set(response.questionId, response);
  }
  const responses = Array.from(dedupedMap.values());

  const profileScores: Record<ModelKey, number> = {
    outsourced: 0,
    fractional: 0,
    fulltime: 0,
  };
  const pillarScores: Record<string, Record<ModelKey, number>> = {};
  const pillarQuestionLog: Record<
    string,
    {
      questionId: number;
      questionText: string;
      selectedOption: string;
      selectedLabel: string;
      weights: Record<ModelKey, number>;
    }[]
  > = {};

  const redFlagsTriggered: TriggeredRedFlag[] = [];
  const multiplierLog: AppliedMultiplier[] = [];
  let forceMinimum: ModelKey | null = null;

  for (const response of responses) {
    const question = data.questions.find((q) => q.id === response.questionId);
    if (!question) continue;

    const selectedOption = question.options.find(
      (o) => o.id === response.optionId
    );
    if (!selectedOption) continue;

    for (const model of ["outsourced", "fractional", "fulltime"] as ModelKey[]) {
      profileScores[model] += selectedOption.weights[model] || 0;
    }

    const pillarKey = question.pillar;
    if (!pillarScores[pillarKey]) {
      pillarScores[pillarKey] = { outsourced: 0, fractional: 0, fulltime: 0 };
      pillarQuestionLog[pillarKey] = [];
    }
    for (const model of ["outsourced", "fractional", "fulltime"] as ModelKey[]) {
      pillarScores[pillarKey][model] += selectedOption.weights[model] || 0;
    }

    pillarQuestionLog[pillarKey].push({
      questionId: question.id,
      questionText: question.text,
      selectedOption: response.optionId,
      selectedLabel: selectedOption.label,
      weights: selectedOption.weights,
    });

    if (selectedOption.redFlag) {
      const flag: TriggeredRedFlag = {
        questionId: response.questionId,
        questionText: question.text,
        selectedLabel: selectedOption.label,
        message: selectedOption.redFlagMessage,
        severity: selectedOption.redFlagSeverity || "high",
        forceMinimum: selectedOption.redFlagForceMinimum,
      };
      redFlagsTriggered.push(flag);

      if (
        !forceMinimum ||
        (flag.forceMinimum &&
          MODEL_HIERARCHY[flag.forceMinimum] > MODEL_HIERARCHY[forceMinimum])
      ) {
        forceMinimum = flag.forceMinimum ?? null;
      }
    }
  }

  const originalProfileScores: Record<ModelKey, number> = { ...profileScores };
  const originalPillarScores: Record<string, Record<ModelKey, number>> = {};
  for (const [key, val] of Object.entries(pillarScores)) {
    originalPillarScores[key] = { ...val };
  }

  for (const trigger of data.complexityMultipliers) {
    const allConditionsMet = trigger.conditions.every((cond) =>
      responses.some(
        (r) => r.questionId === cond.questionId && r.optionId === cond.optionId
      )
    );

    if (allConditionsMet) {
      const beforeScore = originalProfileScores[trigger.appliesTo];
      const afterScore = Math.round(beforeScore * trigger.multiplier);
      profileScores[trigger.appliesTo] = afterScore;

      for (const pillarKey of Object.keys(pillarScores)) {
        pillarScores[pillarKey][trigger.appliesTo] = Math.round(
          originalPillarScores[pillarKey][trigger.appliesTo] * trigger.multiplier
        );
      }

      multiplierLog.push({
        id: trigger.id,
        label: trigger.label,
        description: trigger.description,
        multiplier: trigger.multiplier,
        appliedTo: trigger.appliesTo,
        scoreBefore: beforeScore,
        scoreAfter: afterScore,
      });
    }
  }

  let primaryProfile = findDominantModel(profileScores);

  let redFlagOverrideApplied = false;
  if (
    forceMinimum &&
    MODEL_HIERARCHY[forceMinimum] > MODEL_HIERARCHY[primaryProfile]
  ) {
    primaryProfile = forceMinimum;
    redFlagOverrideApplied = true;
  }

  const globalPercentages = distributePercentages(profileScores);

  const totalPillarsAnswered = Object.keys(pillarScores).length;
  const agreeingPillarCount = Object.values(pillarScores).filter((pillar) => {
    return findDominantModel(pillar) === primaryProfile;
  }).length;

  const consistencyRatioRaw =
    totalPillarsAnswered > 0 ? agreeingPillarCount / totalPillarsAnswered : 0;

  let reportedConfidence: number;
  let confidenceNote: string;

  if (redFlagOverrideApplied) {
    reportedConfidence = Math.max(70, globalPercentages[primaryProfile]);
    confidenceNote =
      "Recommendation is risk-driven due to one or more critical red flags. " +
      "Confidence reflects override strength, not raw score distribution.";
  } else {
    reportedConfidence = globalPercentages[primaryProfile] || 0;
    if (consistencyRatioRaw < 0.4) {
      reportedConfidence = Math.round(reportedConfidence * 0.85);
      confidenceNote =
        "Mixed signals detected across pillars. Confidence adjusted downward.";
    } else if (consistencyRatioRaw > 0.8) {
      reportedConfidence = Math.min(97, Math.round(reportedConfidence * 1.1));
      confidenceNote =
        "Strong cross-pillar alignment detected. Confidence adjusted upward.";
    } else {
      confidenceNote =
        "Moderate cross-pillar alignment. Confidence reflects score distribution.";
    }
  }

  const signalStrength =
    consistencyRatioRaw > 0.7
      ? "Strong"
      : consistencyRatioRaw > 0.4
        ? "Moderate"
        : "Mixed";

  const allPillarLabels = data.pillars.map((p) => p.label);
  const answeredPillarLabels = new Set(Object.keys(pillarScores));
  const unansweredPillars = allPillarLabels.filter(
    (label) => !answeredPillarLabels.has(label)
  );

  const pillarRiskRatings: Record<string, PillarRiskRating> = {};

  for (const [pillarLabel, scores] of Object.entries(pillarScores)) {
    const dominantModel = findDominantModel(scores);

    const sortedEntries = (Object.entries(scores) as [ModelKey, number][]).sort(
      (a, b) => b[1] - a[1]
    );
    const spread = sortedEntries[0][1] - sortedEntries[1][1];

    const pillarPercentages = distributePercentages(scores);

    const riskLevel = getPillarRiskLevel(dominantModel, spread);

    const pillarMeta = data.pillars.find(
      (p) => p.key === pillarLabel || p.label === pillarLabel
    );

    pillarRiskRatings[pillarLabel] = {
      pillarKey: pillarMeta?.key ?? pillarLabel,
      shortLabel: pillarMeta?.shortLabel ?? pillarLabel,
      icon: pillarMeta?.icon ?? "📊",
      description: pillarMeta?.description ?? "",
      dominantModel,
      dominantModelLabel: data.models[dominantModel]?.label || dominantModel,
      riskLevel,
      riskColor: getRiskLevelColor(riskLevel),
      spread,
      scores,
      pillarPercentages,
    };
  }

  const pillarOrder = data.pillars.map((p) => p.label);

  const radarChartData: RadarChartData = {
    labels: data.pillars.map((p) => p.shortLabel),
    datasets: (["fractional", "fulltime", "outsourced"] as ModelKey[]).map(
      (modelKey) => ({
        modelKey,
        label: data.models[modelKey]?.label || modelKey,
        data: pillarOrder.map((pillarLabel) => {
          const s = pillarScores[pillarLabel];
          if (!s) return 0;
          const total = Math.max(
            s.outsourced + s.fractional + s.fulltime,
            1
          );
          return Math.round((s[modelKey] / total) * 100);
        }),
        borderColor: data.models[modelKey].hex,
        backgroundColor: data.models[modelKey].rgba,
        pointBackgroundColor: data.models[modelKey].hex,
      })
    ),
  };

  return {
    recommendedModel: primaryProfile,
    recommendedModelLabel: data.models[primaryProfile]?.label || primaryProfile,
    matchConfidence: reportedConfidence,
    signalStrength,
    consistencyScore: Math.round(consistencyRatioRaw * 100),
    percentages: globalPercentages,
    rawScores: profileScores,
    pillarScores,
    pillarRiskRatings,
    radarChartData,
    redFlagsTriggered,
    redFlagOverrideApplied,
    complexityMultipliersApplied: multiplierLog,
    forceMinimumApplied: forceMinimum || null,
    assessmentMetadata: {
      version: "2.1",
      assessmentId: generateAssessmentId(),
      assessmentDate: getFormattedDate(),
      totalQuestionsAnswered: responses.length,
      totalPillarsEvaluated: totalPillarsAnswered,
      redFlagCount: redFlagsTriggered.length,
      multiplierCount: multiplierLog.length,
      complexityProfile:
        multiplierLog.length >= 3
          ? "Very High"
          : multiplierLog.length >= 2
            ? "High"
            : multiplierLog.length >= 1
              ? "Elevated"
              : "Standard",
      unansweredPillars,
      confidenceNote,
    },
  };
}
