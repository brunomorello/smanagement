use `smanagement`;

CREATE TABLE IF NOT EXISTS `metric` (
	--ID is to store GUID
	`id` varchar(36), 
	`name` varchar(50),
	`target` int(5),
	`status` varchar(10),
	`creation_date` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=latin1;