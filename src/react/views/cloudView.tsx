import { Card, CardContent, Container, Grid, Skeleton, Typography } from '@mui/joy';
import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { gameItemsDictionary } from '../../dictionaries/gameItems.dictionary';
import { EndpointEnum } from '../../enums/endpoint.enum';
import { getImageHelper } from '../../helpers/getImage.helper';
import { useAutoRefetch } from '../../hooks/useAutoRefetch';
import type { CloudInvDto } from '../../types/apis/dataTransferObject/cloudInvDto';
import { CloudInvFm } from '../../types/apis/frontModel/cloudInvFm';

type ItemData = CloudInvFm;

export const CloudView: React.FC = () => {
    const { data: cloudInv } = useAutoRefetch<CloudInvDto[], CloudInvFm[]>(EndpointEnum.CLOUD_INV);

    const [items, setItems] = useState<ItemData[]>();

    const handlePrepareItems = useCallback(() => {
        const temp: ItemData[] = [];

        cloudInv?.forEach((item) => {
            temp.push(item);
        });

        setItems(temp);
    }, [cloudInv]);

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
                                All Items in Dimensional Depot
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
                                        padding: '3px'
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
                                        <Typography marginBottom="5px">{item.name}</Typography>
                                        <Typography level="body-md">
                                            Total: {item.amount}
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
