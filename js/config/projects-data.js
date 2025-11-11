async function initLoadingAnimation() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  if (!loadingOverlay) return;
  
  loadingOverlay.classList.remove('hidden');
  
  try {
    if (typeof window.projectsDataReady !== 'undefined') {
      await window.projectsDataReady;
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    
  } catch (error) {
    console.error('Error during loading:', error);
  } finally {
    loadingOverlay.classList.add('hidden');
    
    setTimeout(() => {
      if (loadingOverlay.parentNode) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }, 600);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initLoadingAnimation();
});

const projects = [
  { id: 1, title: "Website Design", subtitle: "Web Design", year: "2024", description: "Design moderno para website responsivo." },
  { id: 2, title: "Brand Identity", subtitle: "Branding", year: "2024", description: "Criação de identidade visual completa." },
  { id: 3, title: "Mobile App", subtitle: "UI/UX Design", year: "2024", description: "Interface para aplicação móvel." },
  { id: 4, title: "Web App", subtitle: "Development", year: "2023", description: "Desenvolvimento de aplicação web." },
  { id: 5, title: "Photo Project", subtitle: "Photography", year: "2023", description: "Projeto fotográfico criativo." },
  { id: 6, title: "Animation", subtitle: "Motion Graphics", year: "2023", description: "Animações e motion design." }
];

const filterOptions = ["All", "Web Design", "Branding", "UI/UX Design", "Development", "Photography", "Motion Graphics"];

const PEXELS_API_KEY = 'J0g5urDSko7IAE9f7FQqFY07J7o57gfMCu8WmErEJC5mnmqvSFxkhc9c';

const themeQueries = {
  "Web Design": ["website design", "web development", "digital interface"],
  "Branding": ["brand identity", "logo design", "graphic design"],
  "UI/UX Design": ["mobile app design", "user interface", "app design"],
  "Development": ["coding", "programming", "software development"],
  "Photography": ["creative photography", "portrait", "studio photography"],
  "Motion Graphics": ["animation", "motion design", "graphic animation"]
};

async function getPexelsImage(query) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: { 'Authorization': PEXELS_API_KEY }
    });
    const data = await response.json();
    return data.photos?.[0]?.src.large2x || `https://picsum.photos/1200/800?random=${Math.random()}`;
  } catch (error) {
    return `https://picsum.photos/1200/800?random=${Math.random()}`;
  }
}

async function getPexelsVideo(query) {
  try {
    const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=1`, {
      headers: { 'Authorization': PEXELS_API_KEY }
    });
    const data = await response.json();
    return data.videos?.[0]?.video_files?.[0]?.link || "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  } catch (error) {
    return "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  }
}

async function setupProjects() {
  for (let project of projects) {
    const theme = project.subtitle;
    const queries = themeQueries[theme] || [theme.toLowerCase()];
    
    project.imageUrl = await getPexelsImage(queries[0]);
    project.videoUrl = await getPexelsVideo(queries[0]);
    project.galleryImages = [
      await getPexelsImage(queries[0]), 
      await getPexelsImage(queries[1] || queries[0]), 
      await getPexelsImage(queries[2] || queries[0]) 
    ];
    
    console.log(`Projeto "${project.title}": ${queries.join(', ')}`);
  }
  
  return projects;
}

window.projectsDataReady = setupProjects();
