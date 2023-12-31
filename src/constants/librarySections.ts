const LIBRARY_SECTIONS = [
  {
    id: 1,
    items: [
      {
        id: 1,
        title: 'Kahoots',
        icon: 'account-outline',
        onPress: (navigation: any) =>
          navigation.navigate('LibraryKahootsScreen'),
      },
      {
        id: 2,
        title: 'Assignments',
        icon: 'format-list-checks',
        onPress: (navigation: any) =>
          navigation.navigate('LibraryAssignmentsScreen'),
      },
      {
        id: 3,
        title: 'Drafts',
        icon: 'note-outline',
        onPress: (navigation: any) => navigation.navigate('LibraryDraftScreen'),
      },
      {
        id: 4,
        title: 'Reports',
        icon: 'finance',
        onPress: (navigation: any) =>
          navigation.navigate('LibraryReportsScreen'),
      },
    ],
  },
  // {
  //   id: 2,
  //   items: [
  //     {
  //       id: 1,
  //       title: 'Study groups',
  //       icon: 'google-classroom',
  //       onPress: (navigation: any) => navigation.navigate('StudyGroupScreen'),
  //     },
  //     {
  //       id: 2,
  //       title: 'Courses',
  //       icon: 'certificate-outline',
  //       onPress: (navigation: any) => navigation.navigate('CoursesScreen'),
  //     },
  //     {
  //       id: 3,
  //       title: 'Groups',
  //       icon: 'account-group-outline',
  //       onPress: (navigation: any) => navigation.navigate('GroupsScreen'),
  //     },
  //     {
  //       id: 4,
  //       title: 'Study',
  //       icon: 'school-outline',
  //       onPress: (navigation: any) => navigation.navigate('StudyScreen'),
  //     },
  //   ],
  // },
];

export default LIBRARY_SECTIONS;
