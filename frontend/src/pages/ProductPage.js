import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import data from "../dummy/example.json";
import { useLocation } from "react-router-dom";
import { getSearchResults } from "../actions/productActions";
import { useEffect } from "react";
import { SEARCH_RESET } from "../constants/productConstants";

const StyledMain = styled.main`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 64px 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;

    @media screen and (max-width: 768px) {
        margin: 30px;
        padding: 0;
        gap: 30px;
    }
`;

const Title = styled.h1`
    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 64px;

    color: ${({ theme: { colours } }) => `${colours.light.CalmOrange}`};
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    width: 1193px;
    height: 662px;
`;

const Products = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 33px;

    align-self: stretch;
`;

const ProductContainer = styled.a`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
    text-decoration: none;
    cursor: pointer;
`;

const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

const InfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 244px;
`;

const InfoTitle = styled.h2`
    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 100;
    font-size: 20px;

    align-self: stretch;

    color: #000000;
`;

const InfoText = styled.p`
    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;

    align-self: stretch;

    color: #000000;

    span {
        font-weight: 700;
        font-size: 20px;
    }
`;

const Image = styled.img`
    width: 296px;
    height: 296px;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
`;

const BuyProduct = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 16px 32px;
    gap: 16px;

    background: ${({ theme: { colours } }) => `${colours.light.CalmOrange}`};
    border-radius: 16px;

    align-self: stretch;
    flex-grow: 1;

    text-decoration: none;

    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #ffffff;

    @media screen and (max-width: 768px) {
        gap: 15px;
        padding: 16px;
        width: auto;

        h2 {
            font-size: 18px;
            line-height: 21px;
        }
    }
`;

export default function ProductPage() {
    const dispatch = useDispatch();
    const keyword = useLocation().pathname.split("/")[2];
    const search = useSelector((state) => state.search);
    const { results } = search;
    const sampleData = data.results[0];

    useEffect(() => {
        // dispatch(getSearchResults(keyword));
        return () => {
            dispatch({ type: SEARCH_RESET });
        };
    }, [dispatch]);

    return (
        <StyledMain>
            <MainContainer>
                <Products>
                    {data.results.map((product) => {
                        return (
                            <ProductContainer href={product.link}>
                                <Image src={product.image_url} />
                                <ProductList>
                                    <InfoWrap>
                                        <InfoTitle>Name</InfoTitle>
                                        <InfoText>{product.name}</InfoText>
                                    </InfoWrap>
                                    <InfoWrap>
                                        <InfoTitle>Price</InfoTitle>
                                        <InfoText>£{product.price}</InfoText>
                                    </InfoWrap>
                                    <InfoWrap>
                                        <InfoTitle>Per Item</InfoTitle>
                                        <InfoText>
                                            {(
                                                product.price / product.quanity
                                            ).toFixed(2)}
                                            <span>/Item</span>
                                        </InfoText>
                                    </InfoWrap>
                                    <InfoWrap>
                                        <InfoTitle>Seller</InfoTitle>
                                        <InfoText>{product.seller}</InfoText>
                                    </InfoWrap>
                                </ProductList>
                            </ProductContainer>
                        );
                    })}
                </Products>
            </MainContainer>
        </StyledMain>
    );
}
