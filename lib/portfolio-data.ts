export const portfolioData = {
  name: 'Varsha N',
  title: 'AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Enthusiast',
  email: 'varshanandakumar069@gmail.com',
  phone: '+91 9585599344',
  github: 'https://github.com/6-varsha-9',
  linkedin: 'https://linkedin.com/in/varsha-nandakumar-7713b825a',
  location: 'Coimbatore, Tamil Nadu, India',
  bio: 'AI & Data Science undergraduate passionate about building intelligent, data-driven solutions through Machine Learning and AI. Strong analytical thinker with problem-solving skills, adaptability, and a commitment to continuous innovation. Quick learner and collaborative team player focused on creating impactful real-world solutions.',

  education: [
    {
      degree: 'B Tech Artificial Intelligence and Data Science',
      institution: 'Dr. N.G.P. Institute of Technology, Coimbatore',
      period: 'Graduation - May 2026',
      score: 'CGPA: 7.89',
    },
    {
      degree: 'Higher Secondary (HSC)',
      institution: 'Vellalar Matriculation Higher Secondary School, Erode',
      period: 'June 2021 - May 2022',
      score: '84%',
    },
    {
      degree: 'SSLC',
      institution: 'Vellalar Matriculation Higher Secondary School, Erode',
      period: 'June 2019 - March 2020',
      score: '72%',
    },
  ],

  skills: {
    programming: ['Python', 'SQL', 'Java'],
    machineLearning: ['TensorFlow', 'Keras', 'Scikit-Learn', 'Deep Learning', 'Model Evaluation', 'Feature Engineering'],
    computerVision: ['OpenCV', 'MediaPipe', 'Image Processing', 'CNN'],
    nlp: ['NLTK', 'spaCy', 'Text Processing'],
    dataScience: ['NumPy', 'Pandas', 'Data Visualisation', 'Power BI'],
    deployment: ['Flask', 'Docker', 'Jupyter Notebook', 'Google Colab'],
  },

  projects: [
    {
      title: 'AI-Powered Real-Time Sign Language Translator',
      period: 'August 2024 - May 2025',
      description: 'Engineered a real-time ISL-to-text & speech system using CNN, MediaPipe, and OpenCV, classifying 27 Indian Sign Language gestures. Integrated gTTS & pyttsx3 for both online and offline speech synthesis. Deployed via Flask for browser-based real-time interaction.',
      technologies: ['CNN', 'MediaPipe', 'OpenCV', 'Flask', 'gTTS', 'pyttsx3'],
      highlights: ['27 gesture classes', 'Real-time translation', 'Online & offline speech', 'Flask deployment'],
      color: 'cyan',
    },
    {
      title: 'Pneumonia Detection using Machine Learning',
      period: 'November 2023 - August 2024',
      description: 'Developed and deployed a CNN-based chest X-ray classifier with 85% accuracy using TensorFlow, Keras, and Flask for web-based pneumonia detection. Performed image preprocessing, model training, testing, and evaluation. Focused on building a scalable AI solution for healthcare with potential clinical use.',
      technologies: ['TensorFlow', 'Keras', 'CNN', 'Flask', 'Python'],
      highlights: ['85% accuracy', 'Healthcare AI', 'CNN classifier', 'Web deployment'],
      color: 'emerald',
    },
    {
      title: 'Multi-Modal Deep Learning Framework for Autism Spectrum Disorder Screening',
      period: 'September 2025 - February 2026',
      description: 'Developed a multi-modal deep learning system for early autism detection using facial expressions, body pose, and eye gaze from videos. Implemented CNN-Transformer, ST-GCN, and BiGRU models. Applied Grad-CAM and SHAP to provide explainable AI predictions.',
      technologies: ['CNN-Transformer', 'ST-GCN', 'BiGRU', 'GradCAM', 'SHAP', 'Computer Vision'],
      highlights: ['Multi-modal inputs', 'Explainable AI', 'Early detection', 'Video analysis'],
      color: 'blue',
    },
  ],

  internships: [
    {
      role: 'Python Django Developer Intern',
      company: 'Pinsphere Solutions Private Limited',
      location: 'Coimbatore',
      period: 'July 2024',
      points: [
        'Assisted in developing and deploying cloud-based web applications for scalable access.',
        'Optimized MySQL and MongoDB databases, achieving a 15% reduction in query time.',
        'Enhanced responsive UI/UX design, improving user engagement during testing.',
        'Collaborated on full-stack development, integrating front-end and back-end features efficiently.',
      ],
    },
    {
      role: 'Java Developer Intern',
      company: 'CodSoft',
      location: 'Online',
      period: 'April 2024',
      points: [
        'Built mini-projects applying OOP principles (inheritance, file handling, exception management).',
        'Debugged and optimized programs, improving execution efficiency by ~20%.',
        'Strengthened problem-solving & backend development skills.',
      ],
    },
  ],

  certifications: [
    { name: 'Python for Data Science', issuer: 'Great Learning', icon: '🎓' },
    { name: 'Introduction to Artificial Intelligence', issuer: 'Great Learning', icon: '🤖' },
    { name: 'Introduction to Deep Learning', issuer: 'Great Learning', icon: '🧠' },
    { name: 'Certified in CyberSecurity', issuer: 'ISC2', icon: '🔒' },
    { name: 'Power BI for Beginners', issuer: 'Simplilearn', icon: '📊' },
    { name: 'Generative AI for Data Analysts', issuer: 'Coursera', icon: '✨' },
    { name: 'Data Fundamentals', issuer: 'IBM', icon: '💾' },
    { name: 'Get Started Building with Power BI', issuer: 'Microsoft', icon: '📈' },
    { name: 'Google Analytics Certification', issuer: 'Google', icon: '📱' },
    { name: 'AI-Powered Performance Ads Certification', issuer: 'Google', icon: '🎯' },
    { name: 'Advanced IT Skills in Artificial Intelligence', issuer: 'IBM SkillsBuild', icon: '⚡' },
  ],

  hackathons: [
    {
      name: 'Smart India Hackathon',
      period: 'September 2023',
      project: 'Women Safety Drone Project',
      description: 'Developed an AI-powered drone system for women safety with real-time threat detection and emergency response capabilities.',
    },
    {
      name: 'IoT & Automation Hackathon',
      period: '2023',
      project: 'Automation-Based Real-Time Applications',
      description: 'Worked on automation-based projects with real-time IoT applications for smart environment monitoring.',
    },
    {
      name: '24-Hour Hackathon',
      period: 'July 2023',
      project: 'Dr. N.G.P. Institute of Technology',
      description: 'Competed in an intensive 24-hour hackathon, delivering a functional prototype within tight constraints.',
    },
  ],

  achievements: [
    { label: 'AI Projects Built', value: 3, suffix: '+' },
    { label: 'Certifications Earned', value: 11, suffix: '' },
    { label: 'Hackathons Participated', value: 3, suffix: '' },
    { label: 'Paper Presentation Awards', value: 2, suffix: '' },
  ],

  chatbotKnowledge: {
    about: 'Varsha N is an AI & Data Science undergraduate at Dr. N.G.P. Institute of Technology, Coimbatore, graduating in May 2026 with a CGPA of 7.89. She is passionate about Machine Learning, Deep Learning, Computer Vision, NLP, and Generative AI. She is a creative thinker, fast learner, problem solver, and collaborative team player.',
    projects: 'Varsha has built 3 major AI projects: 1) AI-Powered Real-Time Sign Language Translator using CNN, MediaPipe, OpenCV, and Flask to classify 27 ISL gestures in real-time. 2) Pneumonia Detection system achieving 85% accuracy using TensorFlow, Keras, and CNN on chest X-rays. 3) Multi-Modal Deep Learning Framework for Autism Spectrum Disorder Screening using CNN-Transformer, ST-GCN, BiGRU with Explainable AI via Grad-CAM and SHAP.',
    skills: 'Varsha is skilled in Python, SQL, Java for programming. Machine Learning with TensorFlow, Keras, Scikit-Learn. Computer Vision with OpenCV and MediaPipe. NLP with NLTK and spaCy. Data Science with NumPy, Pandas, and Power BI. Deployment with Flask and Docker.',
    internships: 'Varsha completed two internships: 1) Python Django Developer Intern at Pinsphere Solutions, Coimbatore (July 2024) where she built cloud-based web applications and optimized databases by 15%. 2) Java Developer Intern at CodSoft (April 2024) where she built mini-projects using OOP principles and improved execution efficiency by 20%.',
    certifications: 'Varsha holds 11 certifications from IBM, Google, Microsoft, Coursera, ISC2, Great Learning, and Simplilearn covering Data Science, AI, Deep Learning, Cybersecurity, Power BI, and Generative AI.',
    whyHire: 'Varsha combines strong theoretical AI knowledge with hands-on project experience. She has built real-world AI systems for healthcare (pneumonia detection), accessibility (sign language translator), and social good (autism screening). She is a fast learner who completes projects with measurable outcomes, holds 11 certifications, and has participated in national-level hackathons like Smart India Hackathon.',
    unique: 'What makes Varsha unique is her focus on impactful AI - she builds systems that solve real human problems. Her autism detection project uses multi-modal deep learning with Explainable AI. Her sign language translator bridges communication gaps for the deaf community. She combines technical depth with a passion for ethical, explainable AI.',
    autism: 'Varsha\'s autism detection project is a multi-modal deep learning framework developed Sep 2025 - Feb 2026. It analyzes facial expressions, body pose, and eye gaze from videos simultaneously. She implemented CNN-Transformer, ST-GCN (Spatial-Temporal Graph Convolutional Network), and BiGRU models. The system uses Grad-CAM and SHAP for Explainable AI, making predictions interpretable for clinicians.',
    signLanguage: 'The Sign Language Translator (Aug 2024 - May 2025) is a real-time ISL (Indian Sign Language) to text & speech converter. It uses CNN for gesture classification across 27 categories, MediaPipe for hand landmark detection, and OpenCV for video processing. gTTS handles online speech and pyttsx3 handles offline speech synthesis. Deployed via Flask as a web application.',
    pneumonia: 'The Pneumonia Detection system (Nov 2023 - Aug 2024) is a CNN-based chest X-ray classifier achieving 85% accuracy. Built with TensorFlow and Keras, deployed via Flask. It performs image preprocessing, model training, testing, and evaluation. Designed as a scalable healthcare AI solution for clinical decision support and insurance assessment.',
    contact: 'You can reach Varsha at varshanandakumar069@gmail.com or +91 9585599344. Find her on GitHub at github.com/6-varsha-9 and LinkedIn at linkedin.com/in/varsha-nandakumar-7713b825a. She is based in Coimbatore, Tamil Nadu, India.',
    education: 'Varsha is pursuing B Tech in Artificial Intelligence and Data Science at Dr. N.G.P. Institute of Technology, Coimbatore (graduating May 2026, CGPA 7.89). She completed HSC from Vellalar Matriculation Higher Secondary School, Erode with 84%, and SSLC with 72%.',
  },
};

export const chatResponses: Record<string, string> = {
  default: "I'm Varsha AI! I can tell you about Varsha's projects, skills, experience, certifications, and more. Try asking: 'What projects has she built?' or 'Why should I hire her?'",
};
