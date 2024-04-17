import UserData from "./UserData.js";

export default class AccessUserData {
    static async getAllUserData(currentUsername) {
        // Called in create method of FarmScene
        // Fetches user data from the backend
        // Then formats data in appropriate way
        // This data is used to create a PlayerFarm object, which is then displayed
        
        // let newUser = {usernameID: currentUsername, coins: 9999, farmHouseLevel: 1, x: 70, y: 570, email: "fartyartypartypooper@gmail.com", plots: 1};
        // console.log("passing new user", newUser);
        // UserData.createUser(newUser);
        //await UserData.deleteUser('mrsandman')
        
        if (currentUsername == "") {
            alert("guest mode isn't very functional rn (i tried loading defaults but no worky). much apologies");
            return this.loadDefaults()
        }
        let userFarm = await UserData.fetchUserFarm(currentUsername)
        console.log(userFarm);
        let userSeeds;
        let userDecs;
        let userFurniture;
        let tasks;
        let userPlots;
        let userSettings;
        if (!userFarm || userFarm.length == 0) {
            console.log("no user found creating new one");
            UserData.createUser({usernameId: currentUsername})
            .then (bool => {
                console.log(bool)
                location.reload();
                return this.loadDefaults(userFarm, null, null, null, null, null)
            })
            .catch(error => {
                console.error("Error creating UserFarm: ", error)
                alert("Could not find or create Data for you. You are in Guest Mode.")
                return this.loadDefaults(null, null, null, null, null, null)
            });
            return this.loadDefaults(userFarm, null, null, null, null, null)
        }
        else {
            userSeeds = await UserData.fetchUserSeeds(currentUsername)
            console.log(userSeeds);
            userDecs = await UserData.fetchUserDecorations(currentUsername)
            console.log(userDecs);
            userFurniture = await UserData.fetchUserFurniture(currentUsername)
            console.log(userFurniture);
            tasks = await UserData.fetchUserTasks(currentUsername)
            console.log(tasks);
            userPlots = await UserData.fetchUserPlots(currentUsername)
            console.log(userPlots);
            userSettings = await UserData.fetchUserSettings(currentUsername)
            console.log(userSettings);
            return this.loadDefaults(userFarm[0], userSeeds[0], tasks, userDecs, userFurniture, userPlots, userSettings[0])
        }
    }
    static loadDefaults(userFarm, userSeeds, tasks, userDecs, userFurniture, userPlots, userSettings){
        
        if (userFarm == null) {
            console.log("Hello Guest")
            userFarm = {usernameId: "guest", coins: 0, farmHouseLevel: 1, x: 70, y: 570}

            //window.location.replace()
        }
        if (userSeeds == null || Object.keys(userSeeds).length === 0) {
            console.log("no seeds, using default")
            userSeeds = {sunflower: -1, carrot: -1, pumpkin: -1, tulip: -1, tomato: -1};
        }
        if (tasks == null) {tasks = []}
        if (userPlots == null || userPlots.length == 0) {
            console.log("no plots, using default")
            userPlots = [
                {plotId: 0, crop: "nothing", growthStage: 0, growthStep: 0, x: 320, y: 616, placed: true}
            ];}
        if (userDecs == null) {userDecs = [];}
        if (userFurniture == null) {userFurniture = [];}
        if (userSettings == null || Object.keys(userSettings).length === 0) {
            console.log("no userSettings, using default")
            userSettings = {
                workTime : 25,
                shortBreakTime : 5,
                longBreakTime : 15,
                longBreakInterval : 4,
                autoStartBreak : true,
                autoStartPomodoro : false,
                font: 'pixel',
                fontSize: 'normal'
            };
        }

        console.log(userFarm, userPlots, userSettings, userSeeds)
        
        return {
            userFarm: userFarm,
            seedsOwned: userSeeds,
            plots: userPlots,
            tasks: tasks,
            furniture: userFurniture,
            decorations: userDecs,
            userSettings: userSettings
        }
    }

    //changing data:

    static amendCoins(usernameId, coins) {
        UserData.updateUserMoney({usernameId: usernameId, coins: coins});
    }
    static amendHouseState(farmState) {
        UserData.updateHouse(farmState);
    }
    static async amendUserSeeds(seeds) {
        console.log(currentUsername)
        //seeds.usernameId = `${currentUsername}`
        UserData.addUserSeeds(seeds);
    }
    static async updateAllUserPlots(plotList) {
        for (let i = 0; i < plotList.length; i++) {
            this.updateSinglePlot(plotList[i]);
        }
    }

    static async updateSinglePlot(plot) {
        UserData.addUserPlot(plot);
    }



    static async updateAllUserTasks(taskList) {
        for (let i = 0; i < taskList.length; i++) {
            this.updateSingleTask(taskList[i])
        }
    }

    static async updateSingleTask(task) {
        UserData.addUserTask(task)
    }

    static async updateAllUserDecorations(decorationList) {
        for (let i = 0; i < decorationList.length; i++) {
            UserData.addUserDecoration(decorationList[i]);
        }
    }
    static async updateSingleDecoration(decoration) {
        UserData.addUserDecoration(decoration)
    }

    static async updateAllUserFurniture(furnitureList) {
        for (let i = 0; i < furnitureList.length; i++) {
            UserData.addUserFurniture(furnitureList[i]);
        }
    }

    static async updateSingleFurniture(furniture) {
        UserData.addUserFurniture(furniture)
    }

    static async updateUserSettings(settings) {
        UserData.addUserSettings(settings);
    }



    static completelyDeleteUser(usernameId, playerState) {
        UserData.deleteUser(usernameId);
        UserData.deleteUserSeeds(usernameId) 
        for (let i = 0; i < playerState.plots.length; i++) {
            UserData.deleteUserPlot(usernameId, playerState.plots[i].plotId)
        }
        for (let i = 0; i < playerState.tasks.length; i++) {
            UserData.deleteUserTask(usernameId, playerState.tasks[i].plotId)
        }
        for (let i = 0; i < playerState.decorations.length; i++) {
            UserData.deleteUserDecoration(usernameId)
        }
        for (let i = 0; i < playerState.furniture.length; i++) {
         UserData.deleteUserFurniture(usernameId, playerState.furniture[i].type)   
        }
        UserData.deleteUserSettings(usernameId);
    }
}