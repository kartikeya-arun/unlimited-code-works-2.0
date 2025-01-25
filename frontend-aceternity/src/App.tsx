import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import Header from "./components/Header";
import ProjectGrid from "./components/ProjectGrid";
import { FloatingDockDemo } from "./components/Dock";
import { ThemeProvider } from "./components/theme-provider";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BackgroundBeamsWithCollision>
        <Header />
      </BackgroundBeamsWithCollision>
      <ProjectGrid />
      <FloatingDockDemo />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
