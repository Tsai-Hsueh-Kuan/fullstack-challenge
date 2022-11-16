import { Header, Footer } from "../Components";

const Default = (props: any) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "20px",
          paddingTop: "120px",
        }}
      >
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
export default Default;
