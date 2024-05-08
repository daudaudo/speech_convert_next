module.exports = [
	{
		name: "Speech Convert Next",
		script: "node_modules/.bin/next",
		args: "start",
		instances: 2,
		max_memory_restart: "400M",
		exec_mode: "cluster",
		watch: false,
		log_file: "./logs/app.log",
		env: {
			PORT: 3008,
		},
	},
];
