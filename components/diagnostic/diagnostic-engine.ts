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
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CFO-${timestamp}-${random}`;
}

function getFormattedDate(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function getPillarRiskLevel(
  dominantModel: string,
  spread: number
): string {
  if (dominantModel === "fulltime") return "CRITICAL";
  if (dominantModel === "fractional" && spread >= 4) return "HIGH";
  if (dominantModel === "fractional" && spread >= 2) return "MODERATE";
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
}

export interface DiagnosticResult {
  recommendedModel: ModelKey;
  recommendedModelLabel: string;
  matchConfidence: number;
  signalStrength: string;
  consistencyRatio: number;
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
  const profileScores: Record<ModelKey, number> = {
    outsourced: 0,
    fractional: 0,
    fulltime: 0,
  };
  const pillarScores: Record<string, Record<ModelKey, number>> = {};
  const pillarQuestionLog: Record<
    string,
    { questionId: number; questionText: string; selectedOption: string; selectedLabel: string; weights: Record<ModelKey, number> }[]
  > = {};

  const redFlagsTriggered: TriggeredRedFlag[] = [];
  const multiplierLog: AppliedMultiplier[] = [];
  let forceMinimum: ModelKey | null = null;

  for (const response of userResponses) {
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

  for (const trigger of data.complexityMultipliers) {
    const allConditionsMet = trigger.conditions.every((cond) =>
      userResponses.some(
        (r) => r.questionId === cond.questionId && r.optionId === cond.optionId
      )
    );

    if (allConditionsMet) {
      const beforeScore = profileScores[trigger.appliesTo];
      profileScores[trigger.appliesTo] = Math.round(
        profileScores[trigger.appliesTo] * trigger.multiplier
      );
      const afterScore = profileScores[trigger.appliesTo];

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

  let primaryProfile = (
    Object.entries(profileScores) as [ModelKey, number][]
  ).reduce((best, current) => (current[1] > best[1] ? current : best))[0];

  let redFlagOverrideApplied = false;
  if (
    forceMinimum &&
    MODEL_HIERARCHY[forceMinimum] > MODEL_HIERARCHY[primaryProfile]
  ) {
    primaryProfile = forceMinimum;
    redFlagOverrideApplied = true;
  }

  const grandTotal = Object.values(profileScores).reduce(
    (sum, s) => sum + s,
    0
  );
  const globalPercentages: Record<ModelKey, number> = {
    outsourced:
      grandTotal > 0
        ? Math.round((profileScores.outsourced / grandTotal) * 100)
        : 0,
    fractional:
      grandTotal > 0
        ? Math.round((profileScores.fractional / grandTotal) * 100)
        : 0,
    fulltime:
      grandTotal > 0
        ? Math.round((profileScores.fulltime / grandTotal) * 100)
        : 0,
  };

  const totalPillarsAnswered = Object.keys(pillarScores).length;
  const agreeingPillarCount = Object.values(pillarScores).filter((pillar) => {
    const dominantInPillar = (
      Object.entries(pillar) as [ModelKey, number][]
    ).reduce((best, current) => (current[1] > best[1] ? current : best))[0];
    return dominantInPillar === primaryProfile;
  }).length;

  const consistencyRatio =
    totalPillarsAnswered > 0 ? agreeingPillarCount / totalPillarsAnswered : 0;

  let reportedConfidence = globalPercentages[primaryProfile] || 0;
  if (consistencyRatio < 0.4)
    reportedConfidence = Math.round(reportedConfidence * 0.85);
  else if (consistencyRatio > 0.8)
    reportedConfidence = Math.min(
      97,
      Math.round(reportedConfidence * 1.1)
    );

  const signalStrength =
    consistencyRatio > 0.7 ? "Strong" : consistencyRatio > 0.4 ? "Moderate" : "Mixed";

  const pillarRiskRatings: Record<string, PillarRiskRating> = {};
  for (const [pillarLabel, scores] of Object.entries(pillarScores)) {
    const sortedEntries = (
      Object.entries(scores) as [ModelKey, number][]
    ).sort((a, b) => b[1] - a[1]);
    const dominantModel = sortedEntries[0][0];
    const dominantScore = sortedEntries[0][1];
    const secondScore = sortedEntries[1][1];
    const spread = dominantScore - secondScore;
    const pillarTotal = Object.values(scores).reduce((s, v) => s + v, 0);

    const pillarPercentages: Record<ModelKey, number> = {
      outsourced:
        pillarTotal > 0
          ? Math.round((scores.outsourced / pillarTotal) * 100)
          : 0,
      fractional:
        pillarTotal > 0
          ? Math.round((scores.fractional / pillarTotal) * 100)
          : 0,
      fulltime:
        pillarTotal > 0
          ? Math.round((scores.fulltime / pillarTotal) * 100)
          : 0,
    };

    const riskLevel = getPillarRiskLevel(dominantModel, spread);
    const pillarMeta = data.pillars.find((p) => p.label === pillarLabel);

    pillarRiskRatings[pillarLabel] = {
      pillarKey: pillarMeta?.key ?? pillarLabel,
      shortLabel: pillarMeta?.shortLabel ?? pillarLabel,
      icon: pillarMeta?.icon ?? "📊",
      description: pillarMeta?.description ?? "",
      dominantModel,
      dominantModelLabel:
        data.models[dominantModel]?.label || dominantModel,
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
    datasets: [
      {
        modelKey: "fractional",
        label: "Fractional CFO",
        data: pillarOrder.map((pillarLabel) => {
          const s = pillarScores[pillarLabel];
          if (!s) return 0;
          const total = s.outsourced + s.fractional + s.fulltime;
          return total > 0
            ? Math.round((s.fractional / total) * 100)
            : 0;
        }),
        borderColor: data.models.fractional.hex,
        backgroundColor: data.models.fractional.rgba,
        pointBackgroundColor: data.models.fractional.hex,
      },
      {
        modelKey: "fulltime",
        label: "Full-Time CFO",
        data: pillarOrder.map((pillarLabel) => {
          const s = pillarScores[pillarLabel];
          if (!s) return 0;
          const total = s.outsourced + s.fractional + s.fulltime;
          return total > 0
            ? Math.round((s.fulltime / total) * 100)
            : 0;
        }),
        borderColor: data.models.fulltime.hex,
        backgroundColor: data.models.fulltime.rgba,
        pointBackgroundColor: data.models.fulltime.hex,
      },
      {
        modelKey: "outsourced",
        label: "Outsourced Finance",
        data: pillarOrder.map((pillarLabel) => {
          const s = pillarScores[pillarLabel];
          if (!s) return 0;
          const total = s.outsourced + s.fractional + s.fulltime;
          return total > 0
            ? Math.round((s.outsourced / total) * 100)
            : 0;
        }),
        borderColor: data.models.outsourced.hex,
        backgroundColor: data.models.outsourced.rgba,
        pointBackgroundColor: data.models.outsourced.hex,
      },
    ],
  };

  return {
    recommendedModel: primaryProfile,
    recommendedModelLabel:
      data.models[primaryProfile]?.label || primaryProfile,
    matchConfidence: reportedConfidence,
    signalStrength,
    consistencyRatio: Math.round(consistencyRatio * 100),
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
      version: "2.0",
      assessmentId: generateAssessmentId(),
      assessmentDate: getFormattedDate(),
      totalQuestionsAnswered: userResponses.length,
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
    },
  };
}
