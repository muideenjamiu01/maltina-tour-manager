import { School, TourMetrics } from '@/types/tour.types';

export const tourMetrics: TourMetrics = {
  childrenReached: 184200,
  schoolsActivated: 342,
  statesVisited: 18,
  activationCompleted: 342,
};

export const mockSchools: School[] = [
  // South West
  {
    id: 'sw-1',
    name: 'Government Primary School Ikeja',
    state: 'Lagos',
    lga: 'Ikeja',
    region: 'South West',
    schoolType: 'Primary',
    ownership: 'Public',
    location: { lat: 6.5944, lng: 3.3423 },
    visited: true,
    visitDate: 'March 2026',
    studentsReached: 450,
    samplesDistributed: 450,
    story: 'In March 2026, the Maltina Science Nourishment Tour brought an exciting day of learning and discovery to Government Primary School Ikeja. Students participated in interactive science demonstrations that made complex concepts to life. Through hands-on experiments and engaging activities, they discovered the fascinating connection between nutrition and science. The energy in the classrooms was electric as students asked questions, tested theories, and experienced the joy of scientific discovery. Every student received Maltina samples, reinforcing the important message that proper nutrition fuels both body and mind.',
    images: [
      '/images/tour/moments/1.jpg',
      '/images/tour/moments/2.jpg',
      '/images/tour/moments/3.jpg',
      '/images/tour/moments/4.jpg',
      '/images/tour/moments/5.jpg',
      '/images/tour/moments/6.jpg',
    ],
    videos: [
      { title: 'Science Demonstration Highlights', url: '/videos/demo.mp4' },
      { title: 'Student Reactions & Testimonials', url: '/videos/reactions.mp4' },
    ],
    testimonials: [
      {
        name: 'Primary 5 Student',
        class: 'Primary 5',
        quote: 'The science demonstrations were amazing! I learned so much about how important it is to eat healthy foods.',
      },
      {
        name: 'Primary 5 Student',
        class: 'Primary 5',
        quote: 'I enjoyed the interactive experiments. Now I want to become a scientist when I grow up!',
      },
      {
        name: 'Primary 5 Student',
        class: 'Primary 5',
        quote: 'This was the best day at school! The facilitator made learning so fun and exciting.',
      },
    ],
  },
  {
    id: 'sw-2',
    name: 'Community Secondary School Surulere',
    state: 'Lagos',
    lga: 'Surulere',
    region: 'South West',
    schoolType: 'Secondary',
    ownership: 'Public',
    location: { lat: 6.4969, lng: 3.3590 },
    visited: true,
    visitDate: 'March 2026',
    studentsReached: 380,
    samplesDistributed: 380,
    story: 'The Maltina Science Nourishment Tour at Community Secondary School Surulere was a day filled with curiosity and excitement. Secondary school students engaged in more advanced science experiments, exploring topics like chemistry, biology, and the science of nutrition. Interactive sessions helped them understand how the right nutrients support brain function and physical development during their crucial growth years. Students actively participated in group activities, asking insightful questions about scientific processes. The combination of hands-on learning and nutritious refreshments created an unforgettable educational experience.',
    images: [
      '/images/tour/moments/7.jpg',
      '/images/tour/moments/8.jpg',
      '/images/tour/moments/3.jpg',
      '/images/tour/moments/5.jpg',
    ],
    videos: [
      { title: 'Chemistry Lab Demonstrations', url: '/videos/chemistry.mp4' },
    ],
    testimonials: [
      {
        name: 'SS2 Student',
        class: 'SS2',
        quote: 'I never knew nutrition could be so scientific! This tour opened my eyes to how food affects our bodies at the cellular level.',
      },
      {
        name: 'SS1 Student',
        class: 'SS1',
        quote: 'The experiments were challenging but so interesting. I understand now why breakfast is the most important meal of the day.',
      },
      {
        name: 'SS1 Student',
        class: 'SS1',
        quote: 'The experiments were challenging but so interesting. I understand now why breakfast is the most important meal of the day.',
      },
    ],
  },
  {
    id: 'sw-3',
    name: 'St. Mary Primary School Epe',
    state: 'Lagos',
    lga: 'Epe',
    region: 'South West',
    schoolType: 'Primary',
    ownership: 'Private',
    location: { lat: 6.5833, lng: 3.9833 },
    visited: true,
    visitDate: 'April 2026',
    studentsReached: 320,
    samplesDistributed: 320,
    story: 'At St. Mary Primary School Epe, the Maltina Science Nourishment Tour brought joy and learning to eager young students. The private school students were enthusiastic participants in every activity, from simple science experiments to nutrition education games. They learned about food groups, the importance of vitamins and minerals, and how to make healthy eating choices. The interactive demonstrations made complex concepts accessible to young minds, inspiring many to share what they learned with their families at home.',
    images: [
      '/images/tour/moments/2.jpg',
      '/images/tour/moments/4.jpg',
      '/images/tour/moments/6.jpg',
      '/images/tour/moments/1.jpg',
    ],
    videos: [
      { title: 'Primary School Fun Learning', url: '/videos/primary-fun.mp4' },
      { title: 'Nutrition Games & Activities', url: '/videos/nutrition-games.mp4' },
    ],
    testimonials: [
      {
        name: 'Primary 4 Student',
        class: 'Primary 4',
        quote: 'I loved all the games! Now I know why my mommy wants me to drink milk and eat vegetables.',
      },
      {
        name: 'Primary 6 Student',
        class: 'Primary 6',
        quote: 'The science experiments were so cool! I want to teach my little sister what I learned today.',
      },
      {
        name: 'Primary 6 Student',
        class: 'Primary 6',
        quote: 'The science experiments were so cool! I want to teach my little sister what I learned today.',
      },
    ],
  },
  // North Central
  {
    id: 'nc-1',
    name: 'Community Secondary School Garki',
    state: 'Abuja',
    lga: 'Garki',
    region: 'North Central',
    schoolType: 'Secondary',
    ownership: 'Public',
    location: { lat: 9.0579, lng: 7.4951 },
    visited: true,
    visitDate: 'April 2026',
    studentsReached: 420,
    samplesDistributed: 420,
    story: 'The capital city welcomed the Maltina Science Nourishment Tour with great enthusiasm at Community Secondary School Garki. Students from diverse backgrounds came together for a day of scientific discovery and nutrition education. The tour featured advanced demonstrations in physics and biology, showing how energy from food powers everything we do. Students participated in group challenges, solving puzzles related to nutrition and health. The engaging format encouraged teamwork and critical thinking while reinforcing the importance of proper nutrition for academic success.',
    images: [
      '/images/tour/moments/5.jpg',
      '/images/tour/moments/7.jpg',
      '/images/tour/moments/2.jpg',
      '/images/tour/moments/8.jpg',
      '/images/tour/moments/1.jpg',
    ],
    videos: [
      { title: 'Abuja School Visit Highlights', url: '/videos/abuja-highlights.mp4' },
    ],
    testimonials: [
      {
        name: 'SS3 Student',
        class: 'SS3',
        quote: 'As a science student preparing for WAEC, this tour reinforced many concepts I\'m studying. The practical approach was brilliant!',
      },
      {
        name: 'SS2 Student',
        class: 'SS2',
        quote: 'The team challenge was my favorite part. We learned that nutrition is not just about health, but also about mental performance.',
      },
      {
        name: 'SS2 Student',
        class: 'SS2',
        quote: 'The team challenge was my favorite part. We learned that nutrition is not just about health, but also about mental performance.',
      },
    ],
  },
  // North West
  {
    id: 'nw-1',
    name: 'Unity High School Kano',
    state: 'Kano',
    lga: 'Kano Municipal',
    region: 'North West',
    schoolType: 'Secondary',
    ownership: 'Public',
    location: { lat: 12.0022, lng: 8.5920 },
    visited: true,
    visitDate: 'May 2026',
    studentsReached: 500,
    samplesDistributed: 500,
    story: 'Unity High School in Kano hosted one of the largest tour stops, with over 500 enthusiastic students participating in the Maltina Science Nourishment Tour. The students showed exceptional interest in the science demonstrations, particularly those relating to agricultural science and food production. Interactive sessions covered topics from farm to table, explaining how proper nutrition supports both physical and mental development. The cultural diversity of the students added richness to the discussions, with many sharing traditional foods and their nutritional benefits. It was a day that truly celebrated unity through learning and nourishment.',
    images: [
      '/images/tour/moments/6.jpg',
      '/images/tour/moments/3.jpg',
      '/images/tour/moments/4.jpg',
      '/images/tour/moments/8.jpg',
    ],
    videos: [
      { title: 'Kano School Cultural Exchange', url: '/videos/kano-cultural.mp4' },
      { title: 'Large Group Activities', url: '/videos/kano-activities.mp4' },
    ],
    testimonials: [
      {
        name: 'SS1 Student',
        class: 'SS1',
        quote: 'Learning about the science behind our local foods was fascinating. I never knew groundnut had so much protein!',
      },
      {
        name: 'SS2 Student',
        class: 'SS2',
        quote: 'The tour showed us that science is everywhere, even in the meals we eat every day. This inspired me to study food science.',
      },
      {
        name: 'SS3 Student',
        class: 'SS3',
        quote: 'With 500 students, I thought it would be chaotic, but it was well organized and everyone got to participate. Amazing experience!',
      },
    ],
  },
  // South South
  {
    id: 'ss-1',
    name: 'Kings College Port Harcourt',
    state: 'Rivers',
    lga: 'Port Harcourt',
    region: 'South South',
    schoolType: 'Secondary',
    ownership: 'Private',
    location: { lat: 4.8156, lng: 7.0498 },
    visited: true,
    visitDate: 'May 2026',
    studentsReached: 350,
    samplesDistributed: 350,
    story: 'Kings College Port Harcourt became a hub of scientific excitement when the Maltina Science Nourishment Tour arrived. The school\'s well-equipped laboratories provided the perfect setting for advanced demonstrations in chemistry and biology. Students explored the molecular structure of nutrients, conducted pH tests on various foods, and learned about metabolic processes. The hands-on approach helped students connect classroom theory with real-world applications. Many students expressed interest in pursuing careers in nutrition science, food technology, and health sciences after this inspiring experience.',
    images: [
      '/images/tour/moments/1.jpg',
      '/images/tour/moments/7.jpg',
      '/images/tour/moments/5.jpg',
      '/images/tour/moments/2.jpg',
      '/images/tour/moments/6.jpg',
    ],
    videos: [
      { title: 'Advanced Lab Demonstrations', url: '/videos/ph-lab.mp4' },
      { title: 'Student Career Aspirations', url: '/videos/ph-careers.mp4' },
    ],
    testimonials: [
      {
        name: 'SS3 Student',
        class: 'SS3',
        quote: 'The laboratory demonstrations were at the perfect level for us. I\'m definitely considering food science for my university course now.',
      },
      {
        name: 'SS2 Student',
        class: 'SS2',
        quote: 'Seeing the chemical reactions and understanding how our bodies process nutrients made everything click. Best science class ever!',
      },
      {
        name: 'SS1 Student',
        class: 'SS1',
        quote: 'I loved how they connected what we learn in biology class to everyday life. Now I understand why nutrition matters so much.',
      },
    ],
  },
];

export const nigeriaStates = [
  'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Ogun', 'Kaduna', 'Edo', 'Delta',
  'Enugu', 'Anambra', 'Imo', 'Osun', 'Ekiti', 'Ondo', 'Kwara', 'Niger', 'Plateau',
];

export const regions = ['South West', 'North Central', 'North West', 'South South'];
