import LandingPage from "./components/LandingPage";

export default function Home() {
  return <LandingPage contactEmail={process.env.NEXT_PUBLIC_FIVENETWORK_CONTACT_EMAIL ?? ""} />;
}
