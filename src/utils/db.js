export const items = [
    {
        id: 1,
        venue: "Sample Venue 1",
        entity: "Sample Entity 1",
        date: "2024-01-17",
        time: "15:00",
    },
    {
        id: 2,
        venue: "Sample Venue 2",
        entity: "Sample Entity 2",
        date: "2024-01-18",
        time: "18:30",
    },
    {
        id: 3,
        venue: "Sample Venue 3",
        entity: "Sample Entity 3",
        date: "2024-01-19",
        time: "12:45",
    },
    {
        id: 4,
        venue: "Sample Venue 4",
        entity: "Sample Entity 4",
        date: "2024-01-20",
        time: "14:15",
    },
    {
        id: 5,
        venue: "Sample Venue 5",
        entity: "Sample Entity 5",
        date: "2024-01-21",
        time: "10:00",
    },
    {
        id: 6,
        venue: "Sample Venue 6",
        entity: "Sample Entity 6",
        date: "2024-01-22",
        time: "16:45",
    },
    {
        id: 7,
        venue: "Sample Venue 7",
        entity: "Sample Entity 7",
        date: "2024-01-23",
        time: "19:30",
    },
    {
        id: 8,
        venue: "Sample Venue 8",
        entity: "Sample Entity 8",
        date: "2024-01-24",
        time: "11:00",
    },
    {
        id: 9,
        venue: "Sample Venue 9",
        entity: "Sample Entity 9",
        date: "2024-01-25",
        time: "13:20",
    },
    {
        id: 10,
        venue: "Sample Venue 10",
        entity: "Sample Entity 10",
        date: "2024-01-26",
        time: "17:10",
    },
    {
        id: 11,
        venue: "Sample Venue 11",
        entity: "Sample Entity 11",
        date: "2024-01-27",
        time: "09:45",
    },
    {
        id: 12,
        venue: "Sample Venue 12",
        entity: "Sample Entity 12",
        date: "2024-01-28",
        time: "14:30",
    },
    {
        id: 13,
        venue: "Sample Venue 13",
        entity: "Sample Entity 13",
        date: "2024-01-29",
        time: "16:00",
    },
    {
        id: 14,
        venue: "Sample Venue 14",
        entity: "Sample Entity 14",
        date: "2024-01-30",
        time: "20:15",
    },
    {
        id: 15,
        venue: "Sample Venue 15",
        entity: "Sample Entity 15",
        date: "2024-01-31",
        time: "12:00",
    },
    {
        id: 16,
        venue: "Sample Venue 16",
        entity: "Sample Entity 16",
        date: "2024-02-01",
        time: "18:45",
    },
    {
        id: 17,
        venue: "Sample Venue 17",
        entity: "Sample Entity 17",
        date: "2024-02-02",
        time: "14:20",
    },
    {
        id: 18,
        venue: "Sample Venue 18",
        entity: "Sample Entity 18",
        date: "2024-02-03",
        time: "10:30",
    },
    {
        id: 19,
        venue: "Sample Venue 19",
        entity: "Sample Entity 19",
        date: "2024-02-04",
        time: "16:50",
    },
    {
        id: 20,
        venue: "Sample Venue 20",
        entity: "Sample Entity 20",
        date: "2024-02-05",
        time: "19:00",
    },
    {
        id: 21,
        venue: "Sample Venue 21",
        entity: "Sample Entity 21",
        date: "2024-02-06",
        time: "11:40",
    },
    {
        id: 22,
        venue: "Sample Venue 22",
        entity: "Sample Entity 22",
        date: "2024-02-07",
        time: "15:25",
    },
    {
        id: 23,
        venue: "Sample Venue 23",
        entity: "Sample Entity 23",
        date: "2024-02-08",
        time: "17:55",
    },
    {
        id: 24,
        venue: "Sample Venue 24",
        entity: "Sample Entity 24",
        date: "2024-02-09",
        time: "09:15",
    },
    {
        id: 25,
        venue: "Sample Venue 25",
        entity: "Sample Entity 25",
        date: "2024-02-10",
        time: "13:35",
    },
    {
        id: 26,
        venue: "Sample Venue 26",
        entity: "Sample Entity 26",
        date: "2024-02-11",
        time: "16:10",
    },
    {
        id: 27,
        venue: "Sample Venue 27",
        entity: "Sample Entity 27",
        date: "2024-02-12",
        time: "20:30",
    },
    {
        id: 28,
        venue: "Sample Venue 28",
        entity: "Sample Entity 28",
        date: "2024-02-13",
        time: "12:20",
    },
    {
        id: 29,
        venue: "Sample Venue 29",
        entity: "Sample Entity 29",
        date: "2024-02-14",
        time: "14:40",
    },
    {
        id: 30,
        venue: "Sample Venue 30",
        entity: "Sample Entity 30",
        date: "2024-02-15",
        time: "18:00",
    },
];

export const permissionsDb = [
    {
        module: "dashboard",
        all: false,
        create: false,
        read: true,
        update: false,
        delete: false
    },
    {
        module: "user",
        all: false,
        create: true,
        read: true,
        update: true,
        delete: false
    },
    {
        module: "entity",
        all: false,
        create: false,
        read: true,
        update: false,
        delete: false
    },
    {
        module: "meeting",
        all: false,
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        module: "task",
        all: false,
        create: false,
        read: false,
        update: false,
        delete: false
    },
    {
        module: "team",
        all: false,
        create: true,
        read: true,
        update: false,
        delete: true
    },
    {
        module: "report",
        all: false,
        create: false,
        read: true,
        update: false,
        delete: false
    },
    {
        module: "setting",
        all: false,
        create: false,
        read: true,
        update: false,
        delete: false
    }
]

// export const permissionsDb = [
    // {
    //     module: "dashboard",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "user",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "entity",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "meeting",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "task",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "team",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "report",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // },
    // {
    //     module: "setting",
    //     all: true,
    //     create: true,
    //     read: true,
    //     update: true,
    //     delete: true
    // }
// ]

// export const permissionsDb = []