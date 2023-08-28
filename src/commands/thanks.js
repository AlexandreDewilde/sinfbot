const { EmbedBuilder, SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('thanks')
    .setDescription('Return the list of my contributors'),

  async execute(_, interaction) {
    contributor = require('child_process')
      .execSync(
        "git shortlog -sne HEAD | awk '!_[$NF]++' | awk '{$1=$NF=\"\"}1' | awk '{$1=$1}1'",
      )
      .toString()

    const embed = new EmbedBuilder()
      .setTitle('Thanks')
      .setDescription(contributor)
      .setAuthor(interaction.user.username)
      .setColor('#0099ff')
      .setThumbnail(
        'https://images.emojiterra.com/twitter/v13.1/512px/1f44f.png',
      )
    interaction.reply({ embeds: [embed] })
  },
}
