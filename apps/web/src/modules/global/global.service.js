import { Api } from "../../domain";
export var GlobalService;
(function (GlobalService) {
    GlobalService.initialiseStore = async ({ store, }) => {
        // intialise your store here
        Api.Authorization.getPermissions()
            .then(({ roles }) => store.setRoles(roles))
            .catch(() => { });
        Api.Notification.findManyByMe()
            .then(notifications => store.setNotifications(notifications))
            .catch(() => { });
    };
    GlobalService.cleanStore = async ({ store }) => {
        // clean your store here
        store.setRoles([]);
    };
})(GlobalService || (GlobalService = {}));
