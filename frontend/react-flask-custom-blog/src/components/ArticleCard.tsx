import { ActionIcon, Avatar, Badge, Card, Center, Group, Image, rem, Text, useMantineTheme } from "@mantine/core";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./ArticleCard.module.css";

export function ArticleCard({ id, title, content }: { id: number; title: string; content: string }) {
    const linkProps = { href: "https://mantine.dev", target: "_blank", rel: "noopener noreferrer" };
    const theme = useMantineTheme();

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
                <a {...linkProps}>
                    <Image src="/technology_circuit_board_background_closeup_with_technology.png" height={180} />
                </a>
            </Card.Section>

            <Badge className={classes.rating} variant="gradient" gradient={{ from: "yellow", to: "red" }}>
                outstanding
            </Badge>

            <Text className={classes.title} fw={500} component="a" {...linkProps}>
                <Link to={`/blog/${id}`}>{title}</Link>
            </Text>

            <Text fz="sm" c="dimmed" lineClamp={4}>
                {content}
            </Text>

            <Group justify="space-between" className={classes.footer}>
                <Center>
                    <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                        size={24}
                        radius="xl"
                        mr="xs"
                    />
                    <Text fz="sm" inline>
                        Logan Phillips
                    </Text>
                </Center>

                <Group gap={8} mr={0}>
                    <ActionIcon className={classes.action}>
                        <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconBookmark style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[7]} />
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );
}
