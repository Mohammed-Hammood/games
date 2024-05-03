
export const gamesList: GameT[] = [
	{
		id: 1,
		title: "Baldur's Gate 3",
		image: "/images/baldurs-gate-3.png",
		description: "An ancient evil has returned to Baldur's Gate, intent on devouring it from the inside out. The fate of Faerun lies in your hands. Alone, you may resist. But together, you can overcome.",
		rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		developers: ['larian studios'],
		platforms: ["Mac", "PlayStation 5", "Xbox Series X|S", "PC (Microsoft Windows)", "Google Stadia"],
		genres: ["Adventure", "Role-playing (RPG)", "Strategy", "Tactical", "Turn-based strategy (TBS)"],
		initial_release: "06-09-2020",
		want_to_play_count: 421,
		played_count: 470,
		playing_count: 139,
		screenshots: [],
		offline_mode: {
			mode: "single-player"
		},
		online_mode: {
			mode: "single-player"
		},
		available_languages: ["english", "russian"],
		social_sites: [
			{
				url: "https://en.wikipedia.org/wiki/Baldur%27s_Gate_III",
				title: "Wikipedia",
			},
			{
				url: "https://baldursgate3.game/",
				title: "Official site",
			}
		],
	},
	{
		id: 2,
		title: 'Persona 5 Roya',
		image: '/images/persona-5-royal-(2019).png',
		description: "An enhanced version of Persona 5 with some new characters and a third semester added to the game. Released Internationally in 2020.",
		rating: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		developers: ["Atlus"],
		platforms: ["Xbox One", "PlayStation 5", "Nintendo Switch", "Xbox Series X|S", "PC (Microsoft Windows)", "PlayStation 4"],
		genres: ["Adventure", "Role-playing (RPG)", "Turn-based strategy (TBS)"],
		initial_release: "31-09-2019",
		want_to_play_count: 250,
		played_count: 55,
		playing_count: 103,
		screenshots: [],
		offline_mode: {
			mode: "single-player",
		},
		online_mode: {
			mode: "single-player"
		},
		available_languages: ["English"],
		social_sites: [
			{
				title: "Official site",
				url: "https://persona.atlus.com/p5r/home.html",
			},
			{
				title: "Wikipedia",
				url: "https://en.wikipedia.org/wiki/Persona_5",
			}],
	},
	{
		id: 3,
		title: 'God of War Ragnarök',
		image: '/images/god-of-war-ragnarök.png',
		description: "God of War: Ragnarök is the ninth installment in the God of War series and the sequel to 2018's God of War. Continuing with the Norse mythology theme, the game is set in ancient Norway and features series protagonists Kratos, the former Greek God of War, and his young son Atreus. The game kicked off the events of Ragnarök, where Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world.",
		rating: [2, 0, 0, 2, 0, 3, 14, 32, 138, 200],
		developers: ["SIE Santa Monica Studio"],
		platforms: ["PlayStation 5", " PlayStation 4"],
		genres: ["Adventure", "Hack and slash/Beat 'em up"],
		initial_release: "06-11-2020",
		want_to_play_count: 100,
		played_count: 55,
		playing_count: 123,
		screenshots: ["/images/god-of-war-screenshot-1.webp", "/images/god-of-war-screenshot-2.jpg"],
		offline_mode: {
			mode: "single-player"
		},
		online_mode: {
			mode: "single-player"
		},
		available_languages: ["english",],
		social_sites: [
			{
				title: "Official site",
				url: "https://godofwar.playstation.com"
			},
			{
				title: "Wikipedia",
				url: "https://en.wikipedia.org/wiki/God_of_War_Ragnar%C3%B6k"
			}
		],
	}
]
