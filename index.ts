import { App } from "@slack/bolt";

const SLACK_APP_TOKEN = "<PASTE ME>";
const SLACK_BOT_TOKEN = "<PASTE ME>";

const app = new App({
  appToken: SLACK_APP_TOKEN,
  token: SLACK_BOT_TOKEN,
  socketMode: true,
});

app.command("/admins", async ({ ack, client }) => {
  const { members } = await client.users.list();
  const admins = members!.filter((member) => member.is_admin);

  await ack({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `${admins.map((admin) => `@${admin.name}`).join(", ")}`
        }
      },
    ],
    response_type: "ephemeral", // change to "in_channel" to make it visible to others
  });
});

app.start().catch((error) => {
  console.error(error);
  process.exit(1);
});
