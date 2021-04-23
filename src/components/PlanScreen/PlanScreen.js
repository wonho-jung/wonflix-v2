import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUser, set_CurrentPlan } from "../../features/userSlice";
import db from "../../firebase";

function PlanScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start: subscription.data().current_period_start
              .seconds,
          });
          dispatch(
            set_CurrentPlan({
              currentPlan: subscription.data().role,
            })
          );
        });
      });
  }, [user.uid]);
  console.log(subscription);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    console.log(docRef);

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`an error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51Ij8jbAwrkMH8NVn2gzbAauQCOXR77Qe82xY2pec7ImimBvO7xL4zvWqYzt8cqKE0uQgN07J5rMeSeeanj5YdTwy00xC9rD5oJ"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  return (
    <Container>
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productsId, productData]) => {
        const isCurrentPackage = productData.name?.includes(subscription?.role);

        return (
          <ProductsContainer
            key={productsId}
            className={`${isCurrentPackage && "plan__disabled"}`}
          >
            <ProductInfo>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </ProductInfo>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </ProductsContainer>
        );
      })}
    </Container>
  );
}

export default PlanScreen;

const Container = styled.div`
  .plan__disabled {
    button {
      background-color: gray !important;
    }
  }
`;
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    font-weight: 600;
  }
`;
const ProductInfo = styled.div``;
