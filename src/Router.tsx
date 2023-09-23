import { Route, Switch } from "wouter"
import Home from "./pages/Home"
import Country from "./pages/Country"

const Router = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/country/:code" component={Country} />
    </Switch>
  )
}

export default Router
