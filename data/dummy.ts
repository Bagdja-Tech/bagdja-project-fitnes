// Dummy data for S1 Health Fitness

export const locations = {
  studio: {
    name: "Fitness Studio",
    address: "123 Premium Street, City Center",
    phone: "+44 20 1234 5678",
    hours: "Mon-Fri: 6:00 AM - 10:00 PM | Sat-Sun: 8:00 AM - 8:00 PM",
    description: "Group fitness classes only. Timetable-based structured, coached sessions.",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  gym: {
    name: "24/7 Gym",
    address: "456 Fitness Avenue, Business District",
    phone: "+44 20 9876 5432",
    hours: "24/7 Access",
    description: "Standalone gym with 24/7 access. Train independently at your own pace.",
    coordinates: {
      lat: 51.5155,
      lng: -0.0922,
    },
  },
};

// Multiple Fitness Studio locations
export const studioLocations = [
  {
    id: 1,
    name: "Fitness Studio - City Center",
    address: "123 Premium Street, City Center, London",
    phone: "+44 20 1234 5678",
    email: "citycenter@s1healthfitness.com",
    hours: "Mon-Fri: 6:00 AM - 10:00 PM | Sat-Sun: 8:00 AM - 8:00 PM",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
    features: ["Group Classes", "Locker Rooms", "Showers", "Water Station", "Equipment Provided"],
  },
  {
    id: 2,
    name: "Fitness Studio - West End",
    address: "789 Wellness Boulevard, West End, London",
    phone: "+44 20 1234 5679",
    email: "westend@s1healthfitness.com",
    hours: "Mon-Fri: 6:00 AM - 10:00 PM | Sat-Sun: 8:00 AM - 8:00 PM",
    coordinates: {
      lat: 51.5128,
      lng: -0.1396,
    },
    features: ["Group Classes", "Locker Rooms", "Showers", "Cafe", "Equipment Provided"],
  },
  {
    id: 3,
    name: "Fitness Studio - Business District",
    address: "456 Fitness Avenue, Business District, London",
    phone: "+44 20 1234 5680",
    email: "business@s1healthfitness.com",
    hours: "Mon-Fri: 6:00 AM - 10:00 PM | Sat-Sun: 8:00 AM - 8:00 PM",
    coordinates: {
      lat: 51.5155,
      lng: -0.0922,
    },
    features: ["Group Classes", "Locker Rooms", "Showers", "Water Station", "Parking Available"],
  },
];

// Multiple 24/7 Gym locations
export const gymLocations = [
  {
    id: 1,
    name: "24/7 Gym - Business District",
    address: "456 Fitness Avenue, Business District, London",
    phone: "+44 20 9876 5432",
    email: "business@s1healthfitness.com",
    hours: "24/7 Access",
    coordinates: {
      lat: 51.5155,
      lng: -0.0922,
    },
    features: ["Parking Available", "Locker Rooms", "Showers", "Water Station"],
  },
  {
    id: 2,
    name: "24/7 Gym - City Center",
    address: "789 Health Boulevard, City Center, London",
    phone: "+44 20 9876 5433",
    email: "citycenter@s1healthfitness.com",
    hours: "24/7 Access",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
    features: ["Parking Available", "Locker Rooms", "Showers", "Cafe"],
  },
  {
    id: 3,
    name: "24/7 Gym - West End",
    address: "321 Strength Street, West End, London",
    phone: "+44 20 9876 5434",
    email: "westend@s1healthfitness.com",
    hours: "24/7 Access",
    coordinates: {
      lat: 51.5128,
      lng: -0.1396,
    },
    features: ["Locker Rooms", "Showers", "Water Station", "Sauna"],
  },
];

export const classTypes = [
  {
    id: 1,
    name: "HIIT Training",
    description: "High-intensity interval training for maximum results",
    fullDescription: "Push your limits with our high-intensity interval training class. This fast-paced workout alternates between intense bursts of activity and fixed periods of less-intense activity or rest. Perfect for burning calories, improving cardiovascular fitness, and building strength.",
    duration: "45 minutes",
    intensity: "High",
    instructor: "Sarah Johnson",
    instructorBio: "Certified HIIT specialist with 8+ years of experience. Sarah's energetic classes will push you to achieve your fitness goals.",
    price: 15,
    maxParticipants: 20,
    equipment: "None required - bodyweight exercises",
    benefits: [
      "Burn maximum calories in minimal time",
      "Improve cardiovascular health",
      "Build strength and endurance",
      "Boost metabolism",
    ],
    suitableFor: "Intermediate to advanced fitness levels",
  },
  {
    id: 2,
    name: "Yoga Flow",
    description: "Mindful movement and flexibility",
    fullDescription: "Find your flow with our dynamic yoga class that combines movement, breath, and mindfulness. This class focuses on building strength, flexibility, and mental clarity through a series of flowing poses.",
    duration: "60 minutes",
    intensity: "Low",
    instructor: "Emma Williams",
    instructorBio: "200-hour certified yoga instructor specializing in vinyasa and restorative yoga. Emma creates a welcoming space for all levels.",
    price: 12,
    maxParticipants: 25,
    equipment: "Yoga mat (provided)",
    benefits: [
      "Improve flexibility and mobility",
      "Reduce stress and anxiety",
      "Build core strength",
      "Enhance mind-body connection",
    ],
    suitableFor: "All fitness levels",
  },
  {
    id: 3,
    name: "Strength & Conditioning",
    description: "Build power and endurance",
    fullDescription: "Develop functional strength and athletic performance with our comprehensive strength and conditioning program. This class uses free weights, resistance training, and functional movements to build a strong, capable body.",
    duration: "50 minutes",
    intensity: "High",
    instructor: "Mike Thompson",
    instructorBio: "Certified strength and conditioning coach with a background in competitive athletics. Mike helps athletes and fitness enthusiasts reach peak performance.",
    price: 18,
    maxParticipants: 15,
    equipment: "Free weights, resistance bands, kettlebells",
    benefits: [
      "Build functional strength",
      "Improve athletic performance",
      "Increase muscle mass",
      "Enhance bone density",
    ],
    suitableFor: "Intermediate to advanced",
  },
  {
    id: 4,
    name: "Pilates",
    description: "Core strength and stability",
    fullDescription: "Strengthen your core and improve posture with our Pilates class. Focus on controlled movements, proper alignment, and breathing techniques to build a strong foundation.",
    duration: "45 minutes",
    intensity: "Medium",
    instructor: "Lisa Chen",
    instructorBio: "Certified Pilates instructor with expertise in rehabilitation and postural correction. Lisa's attention to detail ensures proper form and maximum benefit.",
    price: 14,
    maxParticipants: 20,
    equipment: "Pilates mat, resistance bands (provided)",
    benefits: [
      "Strengthen core muscles",
      "Improve posture",
      "Enhance flexibility",
      "Prevent injury",
    ],
    suitableFor: "All fitness levels",
  },
  {
    id: 5,
    name: "Spin Class",
    description: "Cardio cycling workout",
    fullDescription: "Get your heart pumping with our high-energy spin class. Set to motivating music, this indoor cycling workout will challenge your cardiovascular system while being easy on your joints.",
    duration: "45 minutes",
    intensity: "High",
    instructor: "David Martinez",
    instructorBio: "Certified cycling instructor and former competitive cyclist. David's classes are known for their energy and motivation.",
    price: 16,
    maxParticipants: 30,
    equipment: "Spin bike (provided)",
    benefits: [
      "Burn calories efficiently",
      "Improve cardiovascular fitness",
      "Low impact on joints",
      "Build leg strength",
    ],
    suitableFor: "All fitness levels",
  },
  {
    id: 6,
    name: "Boxing",
    description: "Full-body combat training",
    fullDescription: "Release stress and build strength with our boxing class. Learn proper technique while getting an intense full-body workout that combines cardio, strength, and coordination.",
    duration: "50 minutes",
    intensity: "High",
    instructor: "James Wilson",
    instructorBio: "Former professional boxer with 15+ years of coaching experience. James teaches proper technique while ensuring a safe, effective workout.",
    price: 20,
    maxParticipants: 18,
    equipment: "Boxing gloves, pads (provided)",
    benefits: [
      "Full-body workout",
      "Improve coordination",
      "Build upper body strength",
      "Stress relief",
    ],
    suitableFor: "All fitness levels",
  },
];

export const timetable = [
  {
    day: "Monday",
    classes: [
      { time: "06:00", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "07:30", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "09:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "12:00", class: "Pilates", instructor: "Lisa Chen" },
      { time: "18:00", class: "Spin Class", instructor: "David Martinez" },
      { time: "19:30", class: "Boxing", instructor: "James Wilson" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "06:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "07:30", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "09:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "12:00", class: "Spin Class", instructor: "David Martinez" },
      { time: "18:00", class: "Pilates", instructor: "Lisa Chen" },
      { time: "19:30", class: "HIIT Training", instructor: "Sarah Johnson" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "06:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "07:30", class: "Boxing", instructor: "James Wilson" },
      { time: "09:00", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "12:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "18:00", class: "Spin Class", instructor: "David Martinez" },
      { time: "19:30", class: "Pilates", instructor: "Lisa Chen" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "06:00", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "07:30", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "09:00", class: "Spin Class", instructor: "David Martinez" },
      { time: "12:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "18:00", class: "Boxing", instructor: "James Wilson" },
      { time: "19:30", class: "HIIT Training", instructor: "Sarah Johnson" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "06:00", class: "Spin Class", instructor: "David Martinez" },
      { time: "07:30", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "09:00", class: "Pilates", instructor: "Lisa Chen" },
      { time: "12:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "18:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "19:30", class: "Boxing", instructor: "James Wilson" },
    ],
  },
  {
    day: "Saturday",
    classes: [
      { time: "08:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "09:30", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "11:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
      { time: "14:00", class: "Pilates", instructor: "Lisa Chen" },
      { time: "16:00", class: "Spin Class", instructor: "David Martinez" },
    ],
  },
  {
    day: "Sunday",
    classes: [
      { time: "08:00", class: "Yoga Flow", instructor: "Emma Williams" },
      { time: "09:30", class: "Pilates", instructor: "Lisa Chen" },
      { time: "11:00", class: "HIIT Training", instructor: "Sarah Johnson" },
      { time: "14:00", class: "Strength & Conditioning", instructor: "Mike Thompson" },
    ],
  },
];

export const memberships = [
  {
    id: 1,
    name: "Studio Membership",
    location: "Fitness Studio",
    price: 89,
    period: "month",
    features: [
      "Unlimited group fitness classes",
      "Access to all class types",
      "Expert coaching",
      "Structured timetable",
      "Community support",
    ],
    cta: "Join Studio",
    popular: false,
  },
  {
    id: 2,
    name: "24/7 Gym Membership",
    location: "24/7 Gym",
    price: 59,
    period: "month",
    features: [
      "24/7 access",
      "Full gym facilities",
      "Premium equipment",
      "Flexible training schedule",
      "Locker facilities",
    ],
    cta: "Join 24/7 Gym",
    popular: true,
  },
  {
    id: 3,
    name: "Premium Membership",
    location: "Both Locations",
    price: 129,
    period: "month",
    features: [
      "Access to both locations",
      "Unlimited group classes",
      "24/7 gym access",
      "Priority booking",
      "All premium amenities",
      "Personal training discount",
    ],
    cta: "Join Premium",
    popular: false,
  },
];

export const personalTraining = {
  title: "Personal Training",
  subtitle: "Achieve your goals with one-on-one guidance",
  description: "Our certified personal trainers work with you to create a customized program tailored to your specific goals, fitness level, and schedule.",
  benefits: [
    {
      title: "Customized Programs",
      description: "Tailored workouts designed specifically for your goals and abilities",
    },
    {
      title: "Expert Guidance",
      description: "Learn proper form and technique from certified professionals",
    },
    {
      title: "Accountability",
      description: "Stay motivated with regular sessions and progress tracking",
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions that fit your busy lifestyle",
    },
  ],
  trainers: [
    {
      name: "Sarah Johnson",
      specialization: "Strength & Conditioning",
      experience: "10+ years",
      bio: "Certified strength coach specializing in functional movement and athletic performance.",
    },
    {
      name: "Mike Thompson",
      specialization: "Weight Loss & Transformation",
      experience: "8+ years",
      bio: "Expert in body composition and metabolic conditioning for sustainable results.",
    },
    {
      name: "Emma Williams",
      specialization: "Rehabilitation & Mobility",
      experience: "12+ years",
      bio: "Physical therapist and movement specialist focused on injury prevention and recovery.",
    },
  ],
  pricing: [
    {
      sessions: 1,
      price: 75,
      period: "session",
    },
    {
      sessions: 5,
      price: 350,
      period: "package",
      savings: "Save £25",
    },
    {
      sessions: 10,
      price: 650,
      period: "package",
      savings: "Save £100",
    },
  ],
};
