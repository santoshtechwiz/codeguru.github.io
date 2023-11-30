In this blog post, I will show you how to configure kafka and produced and consume message using .NET

# What is Kafka?

As per the wikipedia
>Apache Kafka is an open-source stream-processing software platform developed by the Apache Software Foundation, written in Scala and Java. The project aims to provide a unified, high-throughput, low-latency platform for handling real-time data feeds.

##  Main component of kafka

#### Producer
 Send data to the broker
#### Consumer 
 Consumer data/record from the broker
#### Topic
  Where Kafa messages are stored and published. It is simmlar to table in RDBMS.
#### Consumer Group
 Consumer group consists of one or more consumer. The advatnage of consumer group is that you can process the messages in the parallel.

![Durable message system](https://www.cloudkarafka.com/img/blog/durable-message-system.png)

## How to configure kafka locally.

You can configure kafka locally easily by using docker. You can also get hosted version of kafka from Confluent.

- Create a docker network 
```bash
docker create network kafka
```
- Then run following docker command

```bash
docker run -d --network=kafka --name=zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 -e ZOOKEEPER_TICK_TIME=2000 -p 2181:2181  confluentinc/cp-zookeeper

docker run -d --network=kafka --name=kafka -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -p 9092:9092  confluentinc/cp-kafka
```
| Name                       | Description                                                                   |
|----------------------------|-------------------------------------------------------------------------------|
| ZOOKEEPER_CLIENT_PORT      | Port of zookeeper                                                             |
| ZOOKEEPER_TICK_TIME        | It is used to regulate heartbeats, and timeouts.                              |
| KAFKA_ZOOKEEPER_CONNECT    | The address the socket server listens on. It will get the value returned from |
| KAFKA_ADVERTISED_LISTENERS | Hostname and port the broker will advertise to producers and consumers        |


Once the zookeeper and kafka broker is configured.

## Test Kaka using command line terminal

You can test the kafka configuration without writing any test


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTUxMDk2NjI0MywyMDc1NDQ0NjczLDE1Nj
g5MDg0NDMsMTU0MTU0NjA5OSwtMTk0OTc5MDc0OCwxNjU4MzMw
NzI3LC0xOTMyOTE2MjMyLDE1NzIxMzE4MThdfQ==
-->