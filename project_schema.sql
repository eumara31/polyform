--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Models; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Models" (
    model_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    tags text[] NOT NULL,
    formats text[],
    url character varying,
    min_url character varying,
    rating real,
    price real NOT NULL,
    uploader_id integer NOT NULL,
    materials text[],
    currency character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    licence character varying NOT NULL,
    image_urls character varying(255)[],
    rating_votes integer
);


ALTER TABLE public."Models" OWNER TO postgres;

--
-- Name: Models_model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Models" ALTER COLUMN model_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Models_model_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Orders" (
    order_id integer NOT NULL,
    model_id integer NOT NULL,
    seller_id integer NOT NULL,
    customer_id integer NOT NULL,
    price real NOT NULL,
    date date NOT NULL,
    rating real
);


ALTER TABLE public."Orders" OWNER TO postgres;

--
-- Name: Orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Orders" ALTER COLUMN order_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Orders_order_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    user_id integer NOT NULL,
    login character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    mailing boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Users" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Models Models_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models"
    ADD CONSTRAINT "Models_pkey" PRIMARY KEY (model_id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (order_id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (user_id);


--
-- Name: Orders Customer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Customer_fkey" FOREIGN KEY (seller_id) REFERENCES public."Users"(user_id) NOT VALID;


--
-- Name: Orders Model_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Model_fkey" FOREIGN KEY (model_id) REFERENCES public."Models"(model_id) NOT VALID;


--
-- Name: Orders Seller_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Seller_fkey" FOREIGN KEY (seller_id) REFERENCES public."Users"(user_id) NOT VALID;


--
-- Name: Models Uploader_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Models"
    ADD CONSTRAINT "Uploader_fkey" FOREIGN KEY (uploader_id) REFERENCES public."Users"(user_id) NOT VALID;


--
-- PostgreSQL database dump complete
--

