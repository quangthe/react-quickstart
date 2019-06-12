// fontawesome library builder
// https://www.npmjs.com/package/@fortawesome/react-fontawesome
//
// Build a Library to Reference Icons Throughout Your App More Conveniently
// You probably want to use our icons in more than one component in your app, right?
//
// But with explicit importing, it could become tedious to import into each of your app's components every icon you want to reference in that component.
//
// So, add them to the library. Do this setup once in some initializing module of your app, adding all of the icons you'll use in your app's React components.
import { library } from "@fortawesome/fontawesome-svg-core";
// eslint-disable-next-line no-unused-vars
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faSyncAlt);
