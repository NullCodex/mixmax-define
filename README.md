# mixmax-define
`mixmax-define` is an opensource slash command built on top of the [Mixmax SDK](http://sdk.mixmax.com/).

The command is used to find definitions of a word that the user is unfamiliar or needs checking.

### Adding the integration
To add `mixmax-define` to your Mixmax configuration, find the 'Integrations' section of your Mixmax dashboard and use the 'Add Slash Command' button to add a command with the following configuration:

* **Name:** `Define a word`
* **Command:** `define`
* **Parameter placeholder:** `[word]`
* **Command Parameter Suggestions API URL:** `https://mixmax.herokuapp.com/definetypeahead`
* **Command Parameter Resolver API URL:** `https://mixmax.herokuapp.com/defineresolver`
