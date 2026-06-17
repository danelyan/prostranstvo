import { RoomProvider } from "./room/RoomContext";
import { LeadFormProvider } from "./components/LeadForm";
import { RoomDrawer } from "./components/RoomDrawer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Manifesto } from "./sections/Manifesto";
import { Process } from "./sections/Process";
import { Formats } from "./sections/Formats";
import { Catalog } from "./sections/Catalog";
import { Portfolio } from "./sections/Portfolio";
import { Faq } from "./sections/Faq";
import { Contacts } from "./sections/Contacts";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <RoomProvider>
      <LeadFormProvider>
        <Header />
        <main>
          <Hero />
          <Manifesto />
          <Process />
          <Formats />
          <Catalog />
          <Portfolio />
          <Faq />
          <Contacts />
        </main>
        <Footer />
        <RoomDrawer />
      </LeadFormProvider>
    </RoomProvider>
  );
}
