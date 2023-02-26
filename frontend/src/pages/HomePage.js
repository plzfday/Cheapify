import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBeer,
    faBreadSlice,
    faDrumstickBite,
    faJar,
    faLemon,
    faSearch,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import data from "../dummy/example.json";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    font-size: 96px;

    text-align: center;

    color: ${({ theme: { colours } }) => `${colours.light.CalmOrange}`};
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 32px;
`;

const SearchContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 13px 32px;
    gap: 32px;

    width: 1194px;

    border: 3px solid #606060;
    border-radius: 32px;

    overflow: hidden;

    @media screen and (max-width: 768px) {
        padding: 8px 16px;
        gap: 16px;

        width: auto;

        border: 2px solid #606060;
        border-radius: 16px;

        align-self: stretch;
    }
`;

const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;

    align-self: stretch;

    label {
        display: flex;
        justify-content: center;
    }
`;

const Search = styled.input`
    border: 0;
    outline: none;
    padding: 0;
    width: 0;
    flex-grow: 1;

    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    color: #000000;

    &::placeholder {
        color: #606060;
    }

    @media screen and (max-width: 768px) {
        font-weight: 900;
        font-size: 18px;
        line-height: 21px;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    width: 24px;
    height: 24px;
    color: #606060;

    @media screen and (max-width: 768px) {
        width: 16px;
        height: 16px;
    }
`;

const ProductList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

const ProductContainer = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;

    width: 1172px;

    border-radius: 8px 0px 0px 8px;

    align-self: stretch;
    /* cursor: pointer; */
    text-decoration: none;

    &:hover {
        background-color: #e6e6e6;
    }
    background-color: ${({ selected }) => selected && "#e6e6e6"};
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
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
`;

const CategoryOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 32px;
`;

const CategoryWrapper = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    cursor: pointer;
    background-color: ${({ selected }) =>
        selected ? "#e6e6e6" : "transparent"};
    gap: 4px;
`;

const CategoryTitle = styled.h2`
    font-family: "Pretendard Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;

    color: #000000;
`;

const CategoryIcon = styled(FontAwesomeIcon)`
    width: 100px;
    height: 100px;
    color: #000000;
`;

export default function Homepage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [isShowing, setIsShowing] = useState(false);
    const [isMovingMouse, setIsMovingMouse] = useState(false);
    const [cursor, setCursor] = useState(-1);

    const keyboardNavigation = useCallback(
        (e) => {
            setIsMovingMouse(false);
            if (e.key === "ArrowDown") {
                isShowing &&
                    setCursor((prev) =>
                        prev < data.results.length - 1 ? prev + 1 : prev
                    );
            }
            if (e.key === "ArrowUp") {
                isShowing && setCursor((prev) => (prev > 0 ? prev - 1 : 0));
            }
            if (e.key === "Escape") {
                setCursor(-1);
                setIsShowing(false);
            }
            if (e.key === "Enter" && cursor > 0) {
                window.location.replace(data.results[cursor].link);
                setCursor(-1);
                setIsShowing(false);
            }
        },
        [data, isShowing, setCursor, setIsShowing, cursor]
    );

    useEffect(() => {
        window.addEventListener("keydown", keyboardNavigation);
        return () => {
            window.removeEventListener("keydown", keyboardNavigation);
        };
    }, [keyboardNavigation]);

    const mousedown = (index) => {
        setIsMovingMouse(true);
        setCursor(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category === "") {
            navigate({
                pathname: "/products",
                search: `?${createSearchParams({
                    search: keyword,
                })}`,
            });
        } else {
            navigate({
                pathname: "/products",
                search: `?${createSearchParams({
                    search: keyword,
                    category: category,
                })}`,
            });
        }
    };

    useEffect(() => {
        // dispatch(getSearchResults(keyword, category));
        return () => {
            dispatch({ type: SEARCH_RESET });
        };
    }, [dispatch, keyword, category]);

    return (
        <StyledMain>
            <MainContainer>
                <Title>Cheapify</Title>
                <CategoryOptions>
                    <CategoryWrapper
                        onClick={(e) => setCategory("fresh_food")}
                        selected={"fresh_food" === category}
                    >
                        <CategoryIcon icon={faLemon} size="2xl" />
                        <CategoryTitle>Fresh Food</CategoryTitle>
                    </CategoryWrapper>
                    <CategoryWrapper
                        onClick={(e) => setCategory("frozen_food")}
                        selected={"frozen_food" === category}
                    >
                        <CategoryIcon icon={faDrumstickBite} size="2xl" />
                        <CategoryTitle>Frozen Food</CategoryTitle>
                    </CategoryWrapper>
                    <CategoryWrapper
                        onClick={(e) => setCategory("bakery")}
                        selected={"bakery" === category}
                    >
                        <CategoryIcon icon={faBreadSlice} size="2xl" />
                        <CategoryTitle>Bakery</CategoryTitle>
                    </CategoryWrapper>
                    <CategoryWrapper
                        onClick={(e) => setCategory("food_cupboard")}
                        selected={"food_cupboard" === category}
                    >
                        <CategoryIcon icon={faJar} size="2xl" />
                        <CategoryTitle>Food Cupboard</CategoryTitle>
                    </CategoryWrapper>
                    <CategoryWrapper
                        onClick={(e) => setCategory("drinks")}
                        selected={"drinks" === category}
                    >
                        <CategoryIcon icon={faBeer} size="2xl" />
                        <CategoryTitle>Drinks</CategoryTitle>
                    </CategoryWrapper>
                </CategoryOptions>
                <SearchContainer onSubmit={handleSubmit}>
                    <SearchForm>
                        <label htmlFor="keyword">
                            <Icon icon={faSearch} size="2xl" />
                        </label>
                        <Search
                            type="text"
                            id="keyword"
                            autoComplete="off"
                            placeholder="Search"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onClick={(e) => setIsShowing(true)}
                        />
                        {keyword !== "" && (
                            <Icon
                                onClick={(e) => setKeyword("")}
                                icon={faXmark}
                                size="2xl"
                            />
                        )}
                    </SearchForm>
                    {isShowing && (
                        <ProductList>
                            {data?.results.map((result, index) => {
                                return (
                                    <ProductContainer
                                        key={result.id}
                                        to={result.link}
                                        selected={cursor === index}
                                        onMouseMove={() => mousedown(index)}
                                    >
                                        <Image src={result.image_url} />
                                        <InfoWrap>
                                            <InfoTitle>Price</InfoTitle>
                                            <InfoText>£{result.price}</InfoText>
                                        </InfoWrap>
                                        <InfoWrap>
                                            <InfoTitle>Per Item</InfoTitle>
                                            <InfoText>
                                                {(
                                                    result.price /
                                                    result.quanity
                                                ).toFixed(2)}
                                                <span>/Item</span>
                                            </InfoText>
                                        </InfoWrap>
                                        <InfoWrap>
                                            <InfoTitle>Quantity</InfoTitle>
                                            <InfoText>
                                                {result.quanity}
                                            </InfoText>
                                        </InfoWrap>
                                        <InfoWrap>
                                            <InfoTitle>Seller</InfoTitle>
                                            <InfoText>{result.seller}</InfoText>
                                        </InfoWrap>
                                    </ProductContainer>
                                );
                            })}
                        </ProductList>
                    )}
                </SearchContainer>
            </MainContainer>
        </StyledMain>
    );
}
