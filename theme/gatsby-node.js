const crypto = require(`crypto`);

exports.createPages = ({ actions, reporter }) => {
	actions.createPage({
		path: '/',
		component: require.resolve('./src/pages/index.js')
	});
};

exports.sourceNodes = (
	{ actions: { createTypes, createNode } },
	{
		// SEO
		title = 'Connor Leech',
		description = "Hi, my name is Connor Leech. I'm a Content Designer living in Austin, Texas.",
		siteUrl = 'https://connorlee.ch',
		appName = 'Connor Leech', // Progressive Web App Name

		// Content
		headline = 'Connor Leech',
		subHeadline = "I'm a <strong>Content Designer</strong>.<br/> I write for IBM's<br/><strong>design system</strong>.",
		socialList = [
			{
				icon: 'FaGithub',
				url: 'https://github.com/connor-leech',
				ariaLabel: 'Link to my GitHub profile'
			},
			{
				icon: 'FaMedium',
				url: 'https://medium.com/carbondesign',
				ariaLabel: 'Link to the Carbon Design Medium page'
			},
			{
				icon: 'FaTwitter',
				url: 'https://twitter.com/_connorleech',
				ariaLabel: 'Link to my Twitter profile'
			},
			{
				icon: 'FaLinkedin',
				url: 'https://www.linkedin.com/in/connortleech/',
				ariaLabel: 'Link to my LinkedIn profile'
			}
		]
	}
) => {
	createTypes(`
    type MinimalistConfig implements Node {
      title: String!
      description: String!
      siteUrl: String!
      appName: String!
      headline: String!
      subHeadline: String!
      socialList: [Social!]!
    }

    type Social {
      icon: String
      iconSet: String
      url: String
      ariaLabel: String
    }
  `);

	const minimalistConfig = {
		title,
		description,
		siteUrl,
		appName,
		headline,
		subHeadline,
		socialList
	};

	createNode({
		...minimalistConfig,
		id: `gatsby-theme-minimalist-config`,
		parent: null,
		children: [],
		internal: {
			type: `MinimalistConfig`,
			contentDigest: crypto.createHash(`md5`).update(JSON.stringify(minimalistConfig)).digest(`hex`),
			content: JSON.stringify(minimalistConfig),
			description: `Minimalist Theme Config`
		}
	});
};
