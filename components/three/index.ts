import dynamic from "next/dynamic";

export const MenaGlobe = dynamic(() => import("./mena-globe"), { ssr: false });
export const DataSphere = dynamic(() => import("./data-sphere"), { ssr: false });
