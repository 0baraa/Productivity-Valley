import UserData from "./UserData.js";

export default class AccessUserData {
    static async getAllUserData(currentUsername) {
        // Called in create method of FarmScene
        // Fetches user data from the backend
        // Then formats data in appropriate way
        // This data is used to create a PlayerFarm object, which is then displayed
        console.log(currentUsername);
        
        let newUser = {usernameId: currentUsername, coins: 9999, farmhouseLevel: 1, x: 70, y: 570};
        console.log("passing new user", newUser);
        UserData.createUser(newUser);
        
        let userData = await UserData.fetchUserData(currentUsername)
        console.log(userData);
        if (!userData || userData.length == 0) {
            console.log("no user found creating new one")
            userData = {usernameId: currentUsername, coins: 0, farmhouseLevel: 1, x: 70, y: 570};
            UserData.createUser(userData);
        }
        
        let userSeeds = await UserData.fetchUserCrops(currentUsername)
        console.log(userSeeds);
        if (userSeeds == null || userSeeds.length == 0) {
            console.log("no seeds found");
            userSeeds = {usernameId: currentUsername, sunflower: -1, carrot: -1, pumpkin: -1, tulip: -1, tomato: -1}
            UserData.addUserCrop(userSeeds);
        }
        
        
        let userDecs = await UserData.fetchUserDecorations(currentUsername)
        if (userDecs == null) {userDecs = [];}
        
        
        let userFurniture = await UserData.fetchUserFurniture(currentUsername)
        if (userFurniture == null) {userFurniture = [];}
        
        let tasks = await UserData.fetchUserTasks(currentUsername)
        if (tasks == null) {tasks = []}
        

        let userPlots = await UserData.fetchUserPlots(currentUsername)
        if (userPlots == null || userPlots.length == 0) {
            console.log("plots are empty, creating a new plot for user \n\n");
            userPlots = [{ plotId: 0, crop: "nothing", growthStage: 0, growthStep: 24, x: 320, y: 616, placed: true}]
            UserData.addUserPlot(userPlots[0])
        }
        
        let userSettings = await UserData.fetchUserSettings(currentUsername)
        if (userSettings == null) {
            userSettings = {
                usernameId: currentUsername,
                workTime : 25,
                shortBreakTime : 5,
                longBreakTime : 15,
                longBreakInterval : 4,
                autoStartBreak : true,
                autoStartPomodoro : false,
            };
            UserData.addUserSettings(userSettings);
        }
        console.log()
        return {
            userData: userData,
            seedsOwned: userSeeds,
            plots: userPlots,
            tasks: tasks,
            furniture: userFurniture,
            decorations: userDecs,
            userSettings: userSettings
        };
    }

    static amendCoins(usernameId, coins) {
        UserData.updateUserMoney(usernameId, coins);
    }
    static amendHouseState(usernameId, farmState) {
        UserData.updateHouse(usernameId, farmState.farmhouseLevel, farmState.x, farmState.y);
    }
    static async amendUserSeeds(seeds) {
        await UserData.deleteUserCrop(seeds.usernameId);
        UserData.addUserCrop(seeds);
    }
    static async amendUserPlots(plotList) {
        for (let i = 0; i < plotList.length; i++) {
            await UserData.deleteUserPlot(currentUsername, plotList[i].plotId);
            plotList[i].usernameId = currentUsername;
            UserData.addUserPlot(plotList[i]);
        }
    }

    static async amendUserTasks(taskList) {
        for (let i = 0; i < taskList.length; i++) {
            await UserData.deleteUsertask(currentUsername, taskList[i].plotId);
            taskList[i].usernameId = currentUsername;
            UserData.addUserTask(taskList[i]);
        }
    }

    static async amendUserDecorations(decorationList) {
        for (let i = 0; i < decorationList.length; i++) {
            await UserData.deleteUserPlot(currentUsername, decorationList[i].type);
            decorationList[i].usernameId = currentUsername;
            UserData.addUserPlot(decorationList[i]);
        }
    }

    static async amendUserFurniture(furnitureList) {
        for (let i = 0; i < furnitureList.length; i++) {
            await UserData.deleteUserPlot(currentUsername, furnitureList[i].type);
            furnitureList[i].usernameId = currentUsername;
            UserData.addUserPlot(furnitureList[i]);
        }
    }


    static async amendUserSettings(settings) {
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