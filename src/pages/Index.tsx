import Hero from "@/components/Hero";
import Panchang from "@/components/Panchang";
import Services from "@/components/Services";
import About from "@/components/About";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Panchang />
      <Services />
      <About />
    </Layout>
  );
};

export default Index;
