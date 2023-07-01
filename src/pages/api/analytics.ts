import axios from "axios";

async function track(event: string, properties: { [key: string]: string }) {
    console.log("TRACK", event, properties)
}

export default {
    track: track,
}