use `smanagement`;

CREATE TABLE IF NOT EXISTS `metric` (
	--ID is to store GUID
	`id` varchar(36) NOT NULL, 
	`name` varchar(50) NOT NULL,
	`target` int(5) NOT NULL,
	`status` varchar(10) NOT NULL,
	`creation_date` timestamp NOT NULL,
	CONSTRAINT `metric_pk` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;