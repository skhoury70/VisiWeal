import dynamic from "next/dynamic";

export const DealVolumeBarChart = dynamic(
  () => import("./deal-volume-bar-chart"),
  { ssr: false },
);

export const KpiAreaChart = dynamic(
  () => import("./kpi-area-chart"),
  { ssr: false },
);

export const IndustrySectorChart = dynamic(
  () => import("./industry-sector-chart"),
  { ssr: false },
);

export const DealTypeDonut = dynamic(
  () => import("./deal-type-donut"),
  { ssr: false },
);

export const MaDealSankey = dynamic(
  () => import("./ma-deal-sankey"),
  { ssr: false },
);

export const MenaPresenceMap = dynamic(
  () => import("./mena-presence-map"),
  { ssr: false },
);

export const CfoRoiCalculator = dynamic(
  () => import("./cfo-roi-calculator"),
  { ssr: false },
);

export const GrowthLineChart = dynamic(
  () => import("./growth-line-chart"),
  { ssr: false },
);
