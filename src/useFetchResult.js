import { useCallback, useEffect, useReducer } from "react";

// handles loading "status"
function fetchResultReducer(state, action) {
  switch (action.type) {
    case "error": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    }
    case "success": {
      return {
        ...state,
        status: "resolved",
        result: action.result,
        lastFetchedAt: Date.now(),
      };
    }
    case "started": {
      return {
        ...state,
        status: "pending",
      };
    }
    case "didInvalidate": {
      return {
        ...state,
        status: "invalid",
      };
    }
    case "manualUpdate": {
      return {
        ...state,
        result: action.result,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// pass in single 'fetchResult' api callback
// for best results you'll want to memoize it via a useCallback to avoid endless loop
const useFetchResult = (fetchResult) => {
  const [state, dispatch] = useReducer(fetchResultReducer, {
    status: "idle",
    result: null,
    error: null,
  });

  useEffect(() => {
    if (state.status === "idle" || state.status === "invalid") {
      dispatch({ type: "started" });
      fetchResult()
        .then(result => dispatch({ type: "success", result }))
        .catch(error => dispatch({ type: "error", error }));
    }
  }, [fetchResult, state.status]);

  const updateResult = useCallback(
    nextResult => dispatch({ type: "manualUpdate", result: nextResult }),
    [dispatch]
  );

  const onError = useCallback(error => dispatch({ type: "error", error }), [
    dispatch,
  ]);

  const { status, lastFetchedAt } = state;

  return {
    isLoading: status === "idle" || status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
    triggerRefetch: () => {
      dispatch({ type: "didInvalidate" });
    },
    hasFetched: !!lastFetchedAt,
    updateResult, // use carefully! responsible for full shape of 'result'
    onError,
    ...state,
  };
};

export default useFetchResult;
