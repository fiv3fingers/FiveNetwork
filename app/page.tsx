import LandingPage from "./components/LandingPage";

const contactEmail =
  process.env.NEXT_PUBLIC_FIVENETWORK_CONTACT_EMAIL?.trim() || "fivenetwork@pm.me";

export default function Home() {
  return <LandingPage contactEmail={contactEmail} />;
}
