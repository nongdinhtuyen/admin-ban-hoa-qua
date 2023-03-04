import rootReducers from './root_reducers';
import rootSaga from './root_saga';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  devTools: !import.meta.env.PROD,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: ignoredActions,
      // },
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

store.dispatch({
  type: '@@__INIT__',
});

export default store;
