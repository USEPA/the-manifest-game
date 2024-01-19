import { Tree } from "components/Tree/Tree";

import "reactflow/dist/style.css";
import { Config } from "services/config/configService";

export default function App() {
  Config.fetchSubmitManifestTree();
  return <Tree />;
}
