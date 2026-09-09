import { StatsSection } from "@/components/home/stats-section";
import { AboutKanlyteSection } from "@/components/home/about-kanlyte-section";
import { ProjectsSection } from "@/components/home/projects-section";
import HeroSlider from "@/components/home/hero-section";
import { ExperienceShowcase } from "@/components/home/show-case";
import { NewsSection } from "@/components/home/news-section";
import { FAQContactSection } from "@/components/home/faq-section";
import { PartnersSlider } from "@/components/home/partners-slider";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FeaturesGrid } from "@/components/home/services-section";
import { ProductsSection } from "@/components/home/products-section";
import BookDemoButton from "@/components/odoo/book-demo-button";
import { statService } from "@/content-manager/services/stat.service";
import { serviceService } from "@/content-manager/services/service.service";
import { pageContentService } from "@/content-manager/services/page-content.service";
import { productService } from "@/content-manager/services/product.service";
import { projectService } from "@/content-manager/services/project.service";
import { newsPostService } from "@/content-manager/services/news-post.service";
import { partnerService } from "@/content-manager/services/partner.service";
import { heroSlideService } from "@/content-manager/services/hero-slide.service";
import { faqService } from "@/content-manager/services/faq.service";
import { socialLinkService } from "@/content-manager/services/social-link.service";
import { contactInfoService } from "@/content-manager/services/contact-info.service";
import { teamMemberService } from "@/content-manager/services/team-member.service";

export default async function Home() {
  const [
    stats,
    services,
    aboutContent,
    showcaseContent,
    products,
    projects,
    news,
    partners,
    heroSlides,
    faqs,
    socialLinks,
    contactInfo,
    teamMembers,
  ] = await Promise.all([
    statService.getAll(),
    serviceService.getActive(),
    pageContentService.getBySlug("about-home"),
    pageContentService.getBySlug("showcase-home"),
    productService.getActive(),
    projectService.getActive(),
    newsPostService.getActive(),
    partnerService.getActive(),
    heroSlideService.getActive(),
    faqService.getActive(),
    socialLinkService.getActive(),
    contactInfoService.get(),
    teamMemberService.getFeatured(),
  ]);

  return (
    <main>
      <HeroSlider slides={heroSlides} />
      <StatsSection stats={stats} />
      <AboutKanlyteSection stats={stats} pageContent={aboutContent} services={services} />
      <ProductsSection products={products} />
      <FeaturesGrid services={services} />
      <ExperienceShowcase pageContent={showcaseContent} stats={stats} />
      <ProjectsSection projects={projects} />
      <NewsSection news={news} />
      <FAQContactSection faqs={faqs} socialLinks={socialLinks} contactInfo={contactInfo} featuredMembers={teamMembers} />
      <PartnersSlider partners={partners} />
      <NewsletterSection />
      <BookDemoButton />
    </main>
  );
}
