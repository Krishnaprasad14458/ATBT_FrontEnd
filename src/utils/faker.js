const faker = {
    getPermissions: () => {
        return new Promise((resolve) => {
            // Simulating an API call delay using setTimeout
            setTimeout(() => {
                // Simulated permissions data
                const permissions = [
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
                        update: false,
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
                        delete: false
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
                resolve({ data: { permissions } });
            }, 5000); // Simulating 1 second delay
        });
    }
};

export default faker;
