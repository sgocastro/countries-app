import { useEffect, useState } from "react"

type useApiProps = {
  callApi: () => Promise<void>
}

type ApiCallState = {
  fetching: boolean
  error: boolean
}

type ApiCallStateReturn = {
  isFetching: boolean
  hasError: boolean
}

export function useApi({ callApi: callApi }: useApiProps): ApiCallStateReturn {
  const [apiCallState, setApiCallState] = useState<ApiCallState>({
    fetching: false,
    error: false,
  })

  useEffect(() => {
    setApiCallState({ fetching: true, error: false })

    callApi()
      .then(() => setApiCallState({ fetching: false, error: false }))
      .catch(() => {
        setApiCallState({ fetching: false, error: true })
      })
  }, [callApi])

  return {
    isFetching: apiCallState.fetching,
    hasError: apiCallState.error,
  }
}
