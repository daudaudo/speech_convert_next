module.exports = [
	{
		name: "Speech Convert Next",
		script: "node_modules/.bin/next",
		args: "start",
		instances: 4,
		exec_mode: "cluster",
		watch: false,
		log_file: "./logs/app.log",
		env: {
			PORT: 3008,
		},
	},
];
