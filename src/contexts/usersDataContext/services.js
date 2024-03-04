const createUser = async (userData) => {
    try {
        console.log('navig');
        const { data, status } = await api.createUser(userData, authState.token);
        console.log(data, status, 'navig');
        getDashboardUsersData();
        getSettingsUsersData();
        getAllUsers();
        if (status === 200) {
            getDashboardUsersData();
            getSettingsUsersData();
            getAllUsers();
            // navigate(`/`)
        }
    } catch (e) {
        console.error(e);
        throw e;
    }
};