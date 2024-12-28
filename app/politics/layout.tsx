import { Container } from "@mui/material";

export default function PoliticsLayout({ children }) {
  return (
    <Container maxWidth={"xl"}>
      {/* <Header tab="politics"></Header> */}
      <section>{children}</section>
    </Container>
  );
}
