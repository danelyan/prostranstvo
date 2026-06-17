import { LeadFormProvider } from "./components/LeadForm";
import { StudioProvider } from "./lib/studioState";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <StudioProvider>
      <LeadFormProvider>
        <Header />
        <main>
          <Hero />
          <Services />
        </main>
        <Contact />
      </LeadFormProvider>
    </StudioProvider>
  );
}
