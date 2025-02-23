import { Card, CardContent, Container, Grid, Skeleton, Typography } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';

import { gameItemsDictionary } from '../../dictionaries/gameItems.dictionary';
import { EndpointEnum } from '../../enums/endpoint.enum';
import { getImageHelper } from '../../helpers/getImage.helper';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import type { ProdStatsDto } from '../../types/apis/dataTransferObject/prodStatsDto';
import type { WorldInvDto } from '../../types/apis/dataTransferObject/worldInvDto';
import type { ProductionStatFm } from '../../types/apis/frontModel/productionStatFm';
import type { WorldInvFm } from '../../types/apis/frontModel/worldInvFm';

type ItemData = ProductionStatFm & Pick<WorldInvFm, 'amount'>;

export const StorageView: React.FC = () => {
    const { data: worldInv } = useAutoRefetch<WorldInvDto[], WorldInvFm[]>(EndpointEnum.WORLD_INV);

    const { data: prodStats } = useAutoRefetch<ProdStatsDto[], ProductionStatFm[]>(
        EndpointEnum.PRODUCTION_STAT
    );

    const [items, setItems] = useState<ItemData[]>();

    const handlePrepareItems = useCallback(() => {
        const temp: ItemData[] = [];
        worldInv?.forEach((item) => {
            const foundedItem = prodStats?.find((prodItem) => prodItem.name === item.name);
            if (foundedItem) temp.push({ ...foundedItem, amount: item.amount });
            if (!foundedItem)
                temp.push({
                    name: item.name,
                    className: item.className,
                    amount: 0,
                    currentProduction: 0,
                    currentConsumption: 0,
                    percentProduction: 0,
                    percentConsumption: 0,
                    maxProduction: 0,
                    maxConsumption: 0,
                    productionPerMinute: 'P:0.0/min - C: 0.0/min'
                });
        });
        setItems(temp);
    }, [worldInv, prodStats]);

    const getItemCleanName = (name: string) => {
        return name.replace(/_/g, ' ');
    };

    useEffect(() => {
        handlePrepareItems();
    }, [handlePrepareItems]);

    return (
        <Container sx={{ paddingTop: '50px' }}>
            <Card variant="outlined" sx={{ paddingBottom: '0px', marginBottom: '30px' }}>
                <CardContent>
                    <Grid container display="flex" alignItems="center" marginBottom="20px">
                        <Grid xs>
                            <Typography level="h2" fontWeight={600}>
                                All Items in World
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            {items ? (
                <Grid container paddingY={0} px={0} spacing={2}>
                    {items.map((item) => {
                        return (
                            <Grid xs={4} key={item.className}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        padding: '3px',
                                        borderColor:
                                            Math.floor(item.currentConsumption) >
                                            Math.floor(item.currentProduction)
                                                ? 'red'
                                                : Math.floor(item.currentProduction) >
                                                    Math.floor(item.currentConsumption)
                                                  ? 'green'
                                                  : 'var(--joy-palette-neutral-outlinedBorder)',
                                        borderWidth:
                                            Math.floor(item.currentConsumption) >
                                                Math.floor(item.currentProduction) ||
                                            Math.floor(item.currentProduction) >
                                                Math.floor(item.currentConsumption)
                                                ? '3px'
                                                : '1px'
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            padding: '16px'
                                        }}
                                    >
                                        {gameItemsDictionary[item.className] !== undefined && (
                                            <img
                                                src={getImageHelper(item.className) ?? null}
                                                alt="Satisfactory item illustration"
                                                onError={(e) => {
                                                    e.currentTarget.src = `/assets/Icon/notFound.png`;
                                                }}
                                                style={{ height: '70px', width: '70px' }}
                                            />
                                        )}
                                        {gameItemsDictionary[item.className] === undefined && (
                                            <HiOutlineQuestionMarkCircle size="70px" />
                                        )}
                                        <Typography marginBottom="5px">
                                            {getItemCleanName(item.name)}
                                        </Typography>
                                        <Typography level="body-md">
                                            Total: {item.amount}
                                        </Typography>
                                        <Typography level="body-md">
                                            {item.productionPerMinute}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Grid container paddingY={0} px={0} spacing={2}>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={4}>
                        <Card variant="outlined" sx={{ height: '100%', padding: 0 }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '16px'
                                }}
                            >
                                <Skeleton
                                    variant="circular"
                                    height="70px"
                                    width="70px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="50px"
                                    sx={{ marginBottom: '10px' }}
                                />
                                <Skeleton variant="text" width="150px" />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
