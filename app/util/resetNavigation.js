import { NavigationActions } from 'react-navigation'
const resetNavigation = {
  dispatchToSingleRoute: (navigation, routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName }),
      ],
    })
    navigation.dispatch(resetAction)
  },

  dispatchUnderDrawer: (navigation, drawerRoute, finalRoute) => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},
          action: NavigationActions.navigate({ routeName: drawerRoute }),
        }),
        NavigationActions.navigate({ routeName: finalRoute }),
      ],
    })
    navigation.dispatch(resetAction)
  },

  dispatchUnderDrawerWithParams: (navigation, drawerRoute, finalRoute, params) => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home',
          params: {},
          action: NavigationActions.navigate({ routeName: drawerRoute }),
        }),
        NavigationActions.navigate({
          routeName: finalRoute,
          params,
        }),
      ],
    })
    navigation.dispatch(resetAction)
  },
}

export default resetNavigation
