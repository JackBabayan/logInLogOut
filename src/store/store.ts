import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

const isClient = typeof window !== 'undefined';

interface AboutMe {
  description: string;
  ending: string;
  technicalSkills: [{
    coreTechnologies: { name: string, technologies: string[] },
    styling: { name: string, technologies: string[] },
    tools: { name: string, technologies: string[] },
    ui: { name: string, technologies: string[] },
    methodologies: { name: string, technologies: string[] }
  }];
}

interface Project {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  technologies: string[];
}

interface PortfolioTab {
  tab: string;
  date: string,
  projects: Project[];
}

interface Experience {
  position: string;
  location: string;
  dates: string;
  description: string;
  projects: { name: string, url: string }[];
}

interface StoreState {
  aboutMe: AboutMe | null;
  projects: Project[];
  experiences: Experience[];
  portfolio: PortfolioTab[];
  loading: boolean;
  error: string | null;
  winWidth: number;
  fetchProjects: () => Promise<void>;
  fetchExperiences: () => Promise<void>;
  fetchAboutMe: () => Promise<void>;
  fetchPortfolio: () => Promise<void>;
  setWindowWidth: (width: number) => void;
}

const useStore = create<StoreState>()(
  devtools((set) => ({
    aboutMe: null,
    projects: [],
    experiences: [],
    portfolio: [],
    loading: false,
    error: null,
    winWidth: isClient ? window.innerWidth : 0,
    setWindowWidth: (width) => set({ winWidth: width }),
    fetchAboutMe: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<AboutMe>('/mocData/aboutMe.json');
        set({ aboutMe: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch about me data',
          loading: false,
        });
      }
    },

    fetchProjects: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<Project[]>('/mocData/projectsHome.json');
        set({ projects: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch projects',
          loading: false,
        });
      }
    },

    fetchExperiences: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<Experience[]>('/mocData/experiences.json');
        set({ experiences: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch experiences',
          loading: false,
        });
      }
    },

    fetchPortfolio: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<PortfolioTab[]>('/mocData/portfolio.json');
        set({ portfolio: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch portfolio',
          loading: false,
        });
      }
    },
  }))
);

export default useStore;
