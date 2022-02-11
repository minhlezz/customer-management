import { Layout } from "antd";
import "./App.css";
import Header from "./components/Header";
import RouterController from "./routes/Routes";

const { Content } = Layout;
function App() {
  return (
    <Layout className="container bg-white">
      <Header />
      <Content style={{ marginTop: "50px" }} className="bg-grey">
        <RouterController />
      </Content>
    </Layout>
  );
}

export default App;
