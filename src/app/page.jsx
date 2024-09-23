import { Container } from "@mui/material";
import LinkForm from "@/components/LinkForm";
import LinkList from "@/components/LinkList";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/v1/links", {
    next: { tags: ["link"] },
  });

  const dataLink = await res.json();

  return (
    <>
      <Container style={{ margin: "5rem" }}>
        <LinkForm />
        <LinkList links={dataLink} />
      </Container>
    </>
  );
}
