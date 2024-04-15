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
        let userData = await UserData.fetchUserData(currentUsername)
        console.log(userData);
        let userSeeds;
        let userDecs;
        let userFurniture;
        let tasks;
        let userPlots;
        let userSettings;
        if (!userData || userData.length == 0) {
            console.log("no user found creating new one");
            userData = {usernameId: currentUsername, coins: 0, farmHouseLevel: 1, x: 70, y: 570};
            UserData.createUser(userData);
            console.log("creating a seed");
            UserData.addUserCrop({usernameId: currentUsername});
            console.log("plots are empty, creating a new plot for user \n\n");
            userPlots = [{usernameId: currentUsername, plotId: 0, x: 320, y: 616, placed: true}];
            UserData.addUserPlot(userPlots[0]);
            UserData.addUserSettings({usernameId_id: currentUsername});
        }
        else {
            userSeeds = await UserData.fetchUserCrops(currentUsername)
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
            
            
        }
        if (userSeeds == null || Object.keys(userSeeds).length === 0) {
            userSeeds = {sunflower: -1, carrot: -1, pumpkin: -1, tulip: -1, tomato: -1};}
        if (tasks == null) {tasks = []}
        if (userPlots == null || userPlots.length == 0) {
            userPlots = [{plotId: 0, crop: "nothing", growthStage: 0, growthStep: 0, x: 320, y: 616, placed: true}];}
        if (userDecs == null) {userDecs = [];}
        if (userFurniture == null) {userFurniture = [];}
        if (userSettings == null || Object.keys(userSettings).length === 0) {
            console.log("no userSettings, creating their settings")
            userSettings = {
                usernameId_id: currentUsername,
                workTime : 25,
                shortBreakTime : 5,
                longBreakTime : 15,
                longBreakInterval : 4,
                autoStartBreak : true,
                autoStartPomodoro : false,
            };
        }
        
        return {
            userFarm: userData[0],
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
        UserData.updateUserMoney(usernameId, coins);
    }
    static amendHouseState(usernameId, farmState) {
        UserData.updateHouse(usernameId, farmState.farmHouseLevel, farmState.x, farmState.y);
    }
    static async amendUserSeeds(seeds) {
        await UserData.deleteUserCrop(seeds.usernameId);
        seeds.usernameId = currentUsername
        UserData.addUserCrop(seeds);
    }
    static async updateAllUserPlots(plotList) {
        for (let i = 0; i < plotList.length; i++) {
            this.updateSinglePlot(plotList[i]);
        }
    }

    static async updateSinglePlot(plot) {
        await UserData.deleteUserPlot(currentUsername, plot.plotId);
        plot.usernameId = currentUsername;
        UserData.addUserPlot(plot);
    }



    static async updateAllUserTasks(taskList) {
        for (let i = 0; i < taskList.length; i++) {
            this.updateSingleTask(taskList[i])
        }
    }

    static async updateSingleTask(task) {
        await UserData.deleteUserTask(currentUsername, task.plotId)
        task.usernameId = currentUsername;
        UserData.addUserTask(task)
    }

    static async updateAllUserDecorations(decorationList) {
        for (let i = 0; i < decorationList.length; i++) {
            await UserData.deleteUserPlot(currentUsername, decorationList[i].type);
            decorationList[i].usernameId = currentUsername;
            UserData.addUserPlot(decorationList[i]);
        }
    }

    static async updateAllUserFurniture(furnitureList) {
        for (let i = 0; i < furnitureList.length; i++) {
            await UserData.deleteUserPlot(currentUsername, furnitureList[i].type);
            furnitureList[i].usernameId = currentUsername;
            UserData.addUserPlot(furnitureList[i]);
        }
    }


    static async updateUserSettings(settings) {
        await UserData.deleteUserSettings(currentUsername);
        settings.usernameId = currentUsername;
        UserData.addUserSettings(settings);
    }




    static completelyDeleteUser(usernameId, playerState) {
        UserData.deleteUser(usernameId);
        UserData.deleteUserCrop(usernameId) 
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