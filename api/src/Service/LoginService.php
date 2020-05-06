<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Security\Core\Authentication\AuthenticationManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Security;

class LoginService
{

    /** @var EntityManagerInterface */
    private $em;
    /** @var Security */
    private $security;
    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * @var AuthenticationManagerInterface
     */
    private $authenticationManager;

    /**
     * @var RequestStack
     */
    private $requestStack;

    public function __construct(EntityManagerInterface $em, Security $security, TokenStorageInterface $tokenStorage, AuthenticationManagerInterface $authenticationManager, RequestStack $requestStack)
    {
        $this->em = $em;
        $this->security = $security;
        $this->tokenStorage = $tokenStorage;
        $this->authenticationManager = $authenticationManager;
        $this->requestStack = $requestStack;
    }

    public function denyAccessUnlessHasUser(): User
    {
        $request = $this->requestStack->getCurrentRequest();

        $accessToken = $request->headers->get('authorization');

        if (!$accessToken) throw new AccessDeniedHttpException("Missing token");

        /** @var User $user */
        $user = $this->em->getRepository(User::class)->findOneBy([
            'accessToken' => $accessToken
        ]);

        if (!$user) throw new AccessDeniedHttpException("Access denied");

        $token = new UsernamePasswordToken($user, null, 'main');

//        $authenticatedToken = $this->authenticationManager->authenticate($token);

        $this->tokenStorage->setToken($token);

        return $user;
    }


}