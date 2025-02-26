'use client';
import { useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { Box, Button, Input, Stack, Text, Tooltip } from '@chakra-ui/react';
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form";

import { useAuth } from '@/context/AuthContext';

import styles from "@/styles/form.module.scss"

interface FormValues {
  username: string;
  password: string;
}

export default function AuthPage() {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data: FormValues) => {
    login(data.username, data.password);
  });

  return (
    <Box p={8} maxW="md" mx="auto">
      <form onSubmit={onSubmit} className={styles.formWrapper}>
        <Stack gap={4} align="center">
          <div className={styles.formItem}>
            <Tooltip label="Username : admin">
              <Text>
                User name
              </Text>
            </Tooltip>
            <Input placeholder="User name" {...register("username", { required: "User name is required" })} />
            {errors.username?.message && <Text textStyle="xs" color={"red"}>{errors.username?.message}</Text>}
          </div>

          <div className={styles.formItem}>
            <Tooltip label="Password : 12345">
              <Text>
                Password
              </Text>
            </Tooltip>
            <PasswordInput placeholder="Password" {...register("password", { required: "Password is required" })} />
            {errors.password?.message && <Text textStyle="xs" color={"red"}>{errors.password?.message}</Text>}
          </div>

          <Button type="submit" colorScheme="green" variant="outline">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
